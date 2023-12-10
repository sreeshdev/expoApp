import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import * as _ from "lodash";
import API from "api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ActionTypes from "../actions/action.types";
import * as Actions from "../actions";

function* whoAmI(action) {
  try {
    console.log(action);
    const response = yield API.get(`/individual/whoami/parent`);

    if (action.payload) {
      yield put(Actions.whoAmIRefreshSuccess(response.data));
    } else {
      yield put(Actions.whoAmISuccess(response.data));
    }
  } catch (error) {
    yield put(Actions.whoAmIFailure(error));
  }
}

function* getOtp(action) {
  try {
    const reqData = {
      username: action.payload.userName,
      type: "PARENT",
    };
    const reqHeaders = {
      "X-Web-Auth-Scope": "MOBILE_PARENT",
    };
    const result = yield API.post(`/register/ask`, reqData, {
      headers: reqHeaders,
    });
    const responseFromHeader = {
      uid: result.headers.uid,
      did: result.headers.did,
    };
    AsyncStorage.setItem("uid", result.headers.uid);
    AsyncStorage.setItem("did", result.headers.did);
    yield put(Actions.getOtpSuccess(responseFromHeader));
  } catch (error) {
    yield put(Actions.getOtpFailure(error));
  }
}

function* verifyOtp(action) {
  try {
    const params = {
      signature: action.payload.signature,
      type: "PARENT_MOBILE_SIGN_UP",
    };
    const reqHeaders = {
      "X-Web-Auth-Scope": "MOBILE_PARENT",
    };
    const result = yield API.get(`/register/verify`, {
      params,
      headers: reqHeaders,
    });
    yield put(Actions.verifyOtpSuccess(result.data));
  } catch (error) {
    console.log(error);
    yield put(Actions.verifyOtpFailure(error));
  }
}

function* login(action) {
  try {
    const reqData = {
      signature: action.payload.signature,
      type: "PARENT_MOBILE_SIGN_UP",
    };
    const reqHeaders = {
      "X-Web-Auth-Scope": "MOBILE_PARENT",
    };

    const result = yield API.post(`/register`, reqData, {
      headers: reqHeaders,
    });
    const responseFromHeader = {
      sid: result.headers.sid,
    };
    AsyncStorage.setItem("sid", result.headers.sid);
    yield put(Actions.loginSuccess(responseFromHeader));
  } catch (error) {
    yield put(Actions.loginFailure(error));
  }
}

function* getToken(action) {
  try {
    let payload = null;
    AsyncStorage.removeItem("token");
    if (action.payload === "REFRESH") {
      const refreshToken = yield AsyncStorage.getItem("refreshToken");
      payload = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      };
    }
    const reqHeaders = {
      "X-Web-Auth-Scope": "MOBILE_PARENT",
    };

    const result = yield API.post(`/oauth/token`, payload, {
      headers: reqHeaders,
    });
    AsyncStorage.setItem("token", result?.data?.access_token);
    AsyncStorage.setItem("refreshToken", result?.data?.refresh_token);
    yield put(Actions.getTokenSuccess(result?.data));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(Actions.getToken());
    } else yield put(Actions.getTokenFailure(error));
  }
}

function* logout(action) {
  try {
    AsyncStorage.clear();
    yield put(Actions.logoutSuccess());
  } catch (error) {
    yield put(Actions.logoutFailure(error));
  }
}

function* getStudentList(action: Object) {
  try {
    const response = yield API.get(`/students/roster`, {
      params: action.payload,
    });
    yield put(Actions.getStudentListSuccess(response.data));
  } catch (error) {
    yield put(Actions.getStudentListFailure(error));
  }
}

function* setStudentPreference(action: Object) {
  try {
    const { parentIndividualId, childrenIndividualId } = action.payload;
    const response = yield API.put(
      `/parents/preferences/${parentIndividualId}/select/${childrenIndividualId}`
    );
    yield put(Actions.setStudentPreferenceSuccess(response.data));
  } catch (error) {
    yield put(Actions.setStudentPreferenceFailure(error));
  }
}

function* getStudentDetails(action: Object) {
  try {
    const response = action.payload; //yield API.get(`/students/${action.payload}`);
    yield put(Actions.getStudentDetailsSuccess(response));
  } catch (error) {
    yield put(Actions.getStudentDetailsFailure(error));
  }
}

function* getStudentAttendanceStats(action: Object) {
  try {
    const { instituteId, schoolYearId, studentIds } = action.payload;
    const response = yield API.get(
      `attendance/summary?instituteId=${instituteId}&schoolYearId=${schoolYearId}&studentIndividualIds=${studentIds}`
    );
    yield put(Actions.getStudentAttendanceStatsSuccess(response.data));
  } catch (error) {
    yield put(Actions.getStudentAttendanceStatsFailure(error));
  }
}

function* getStudentIndividualAttendance(action: Object) {
  try {
    const { startDate, endDate, studentId } = action.payload;
    const response = yield API.get(
      `attendance/summary/individual/${studentId}`,
      { params: { startDate, endDate } }
    );
    yield put(Actions.getStudentIndividualAttendanceSuccess(response.data));
  } catch (error) {
    yield put(Actions.getStudentIndividualAttendanceFailure(error));
  }
}

function* getStudentExamStats(action: Object) {
  try {
    const { schoolYearId, studentIds } = action.payload;
    const response = yield API.get(
      `/exam/individual/${studentIds}?schoolYearId=${schoolYearId}`
    );
    yield put(Actions.getStudentExamStatsSuccess(response.data));
  } catch (error) {
    yield put(Actions.getStudentExamStatsFailure(error));
  }
}

function* getSectionTimetable(action: Object) {
  try {
    const { sectionId, studentIndividualId } = action.payload;
    const response = yield API.get(`/calendar/section/${sectionId}`, {
      params: {
        studentIndividualId,
        // startDate: 1696143600000,
        // endDate: 1696748399999,
      },
    });
    yield put(Actions.getSectionTimetableSuccess(response.data));
  } catch (error) {
    yield put(Actions.getSectionTimetableFailure(error));
  }
}

function* getActivitySummary(action: Object) {
  try {
    const { sectionId, courseId, startRange, endRange } = action.payload;
    let response;
    if (courseId) {
      response = yield API.get(
        `/attendance/activities/summary/section/${sectionId}/range?start=${startRange}&end=${endRange}&courseId=${courseId}`
      );
    } else {
      response = yield API.get(
        `/attendance/activities/summary/section/${sectionId}/range?start=${startRange}&end=${endRange}`
      );
    }
    yield put(Actions.getActivitySummarySuccess(response.data));
  } catch (error) {
    yield put(Actions.getActivitySummaryFailure(error));
  }
}

function* getStudentTimeOff(action: Object) {
  try {
    let response = yield API.get(`/institute/student/time-off`, {
      params: action.payload,
    });
    yield put(Actions.getStudentTimeOffSuccess(response.data));
  } catch (error) {
    yield put(Actions.getStudentTimeOffFailure(error));
  }
}

function* getCommunicationCategory(action: Object) {
  try {
    let response = yield API.get(`/institute/parent-message/category`, {
      params: action.payload,
    });
    yield put(Actions.getCommunicationCategorySuccess(response.data));
  } catch (error) {
    yield put(Actions.getCommunicationCategoryFailure(error));
  }
}

function* getStudentLeaveApply(action: Object) {
  try {
    let response = yield API.get(`/time-off/students`, {
      params: action.payload,
    });
    yield put(Actions.getStudentLeaveApplySuccess(response.data));
  } catch (error) {
    yield put(Actions.getStudentLeaveApplyFailure(error));
  }
}

function* createStudentLeaveApply(action: Object) {
  try {
    let response = yield API.post(`/time-off/students`, action.payload);
    yield put(Actions.createStudentLeaveApplySuccess(response.data));
  } catch (error) {
    yield put(Actions.createStudentLeaveApplyFailure(error));
  }
}

function* updateStudentLeaveApply(action: Object) {
  try {
    let response = yield API.put(`/time-off/students`, action.payload);
    yield put(Actions.updateStudentLeaveApplySuccess(response.data));
  } catch (error) {
    yield put(Actions.updateStudentLeaveApplyFailure(error));
  }
}

function* deleteStudentLeaveApply(action: Object) {
  try {
    let response = yield API.delete(`/time-off/students/${action.payload.id}`);
    yield put(Actions.deleteStudentLeaveApplySuccess(response.data));
  } catch (error) {
    yield put(Actions.deleteStudentLeaveApplyFailure(error));
  }
}

function* getTickets(action: Object) {
  try {
    let response = yield API.get(`/tickets`, {
      params: action.payload,
    });
    yield put(Actions.getTicketsSuccess(response.data));
  } catch (error) {
    yield put(Actions.getTicketsFailure(error));
  }
}

function* createTickets(action: Object) {
  try {
    let response = yield API.post(`/tickets/parents`, action.payload);
    yield put(Actions.createTicketsSuccess(response.data));
  } catch (error) {
    yield put(Actions.createTicketsFailure(error));
  }
}

function* getTicketInfo(action: Object) {
  try {
    let response = yield API.get(`/tickets/${action.payload.id}`);
    yield put(Actions.getTicketInfoSuccess(response.data));
  } catch (error) {
    yield put(Actions.getTicketInfoFailure(error));
  }
}

function* addMessageToTicket(action: Object) {
  try {
    let response = yield API.put(`/tickets/parents`, action.payload);
    yield put(Actions.addMessageToTicketSuccess(response.data));
  } catch (error) {
    yield put(Actions.addMessageToTicketFailure(error));
  }
}

function* getExamRoster(action: Object) {
  try {
    let response = yield API.get(`/exam/roster/parent`, {
      params: action.payload,
    });

    yield put(Actions.getExamRosterSuccess(response.data));
  } catch (error) {
    yield put(Actions.getExamRosterFailure(error));
  }
}

function* getOneExamData(action: Object) {
  try {
    let response = yield API.get(
      `/exam/section/${action.payload.examId}/parent`
    );
    let response2 = yield API.get(
      `/exam/individual/${action.payload.individualId}?schoolYearId=${action.payload.schoolYearId}&parentExamId=${action.payload.parentExamId}`
    );
    yield put(
      Actions.getOneExamDataSuccess({
        examDetails: response.data,
        markDetail: response2.data,
      })
    );
  } catch (error) {
    yield put(Actions.getOneExamDataFailure(error));
  }
}

/* Get Section Details */
function* getSectionCourseDetails(action: Object) {
  try {
    const response = yield API.get(
      `/section/${action.payload}/course/parents-view`
    );
    yield put(Actions.getSectionCourseDetailsSuccess(response.data));
  } catch (error) {
    yield put(Actions.getSectionCourseDetailsFailure(error));
  }
}

function* setNotificationToken(action: Object) {
  try {
    const response = yield API.put(`/notification/device/push`, action.payload);
    yield put(Actions.setNotificationTokenSuccess(action.payload));
  } catch (error) {
    yield put(Actions.setNotificationTokenFailure(error));
  }
}

function* getAttendanceStatus(action: Object) {
  try {
    const { instituteId, schoolYearId } = action.payload;
    let response;
    if (instituteId && schoolYearId) {
      response = yield API.get(
        `/attendance/statuses/institute/${instituteId}/school-year/${schoolYearId}`
      );
    } else if (instituteId && !schoolYearId) {
      response = yield API.get(`/attendance/statuses/institute/${instituteId}`);
    }
    yield put(Actions.getAttendanceStatusSuccess(response.data));
  } catch (error) {
    yield put(Actions.getAttendanceStatusFailure(error));
  }
}

function* getAllEvents(action: Object) {
  try {
    const response = yield API.get(`/calendar/event/parents/roster`, {
      params: action.payload,
    });
    yield put(Actions.getAllEventsSuccess(response.data));
  } catch (error) {
    yield put(Actions.getAllEventsFailure(error));
  }
}

function* getNotification(action: Object) {
  try {
    const response = yield API.get(`/notification`, {
      params: action.payload,
    });
    yield put(Actions.getNotificationSuccess(response.data));
  } catch (error) {
    yield put(Actions.getNotificationFailure(error));
  }
}

function* getNotificationSettings(action: Object) {
  try {
    const response = yield API.get(`/notification/settings`);
    yield put(Actions.getNotificationSettingsSuccess(response.data));
  } catch (error) {
    yield put(Actions.getNotificationSettingsFailure(error));
  }
}

function* updateNotificationSettings(action: Object) {
  try {
    const { type, actionType, deliveryMethod } = action.payload;
    const response = yield API.put(
      `/notification/settings/type/${type}/action/${actionType}/delivery/${deliveryMethod}`
    );
    yield put(Actions.updateNotificationSettingsSuccess(response.data));
  } catch (error) {
    yield put(Actions.updateNotificationSettingsFailure(error));
  }
}

function* updateNotification(action: Object) {
  try {
    yield API.put(`/notification/status`, action.payload);
    // const response = yield API.get(`/notification`, { params: { page: 1 } });
    yield put(Actions.updateNotificationSuccess({}));
  } catch (error) {
    yield put(Actions.updateNotificationFailure(error));
  }
}

export default function* AppBaseSaga() {
  yield takeLatest(ActionTypes.WHO_AM_I_START, whoAmI);
  yield takeLatest(ActionTypes.GET_OTP_START, getOtp);
  yield takeLatest(ActionTypes.VERIFY_OTP_START, verifyOtp);
  yield takeLatest(ActionTypes.LOGIN_START, login);
  yield takeLatest(ActionTypes.GET_TOKEN_START, getToken);
  yield takeLatest(ActionTypes.LOGOUT_START, logout);
  yield takeLatest(ActionTypes.GET_STUDENT_LIST_START, getStudentList);
  yield takeLatest(ActionTypes.GET_ACTIVITY_SUMMARY_START, getActivitySummary);
  yield takeLatest(
    ActionTypes.SET_STUDENT_PREFERENCE_START,
    setStudentPreference
  );
  yield takeLatest(ActionTypes.GET_STUDENT_DETAILS_START, getStudentDetails);
  yield takeLatest(
    ActionTypes.GET_STUDENT_ATTENDANCE_STATS_START,
    getStudentAttendanceStats
  );
  yield takeLatest(
    ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_START,
    getStudentIndividualAttendance
  );
  yield takeLatest(
    ActionTypes.GET_STUDENT_EXAM_STATS_START,
    getStudentExamStats
  );
  yield takeLatest(
    ActionTypes.GET_SECTION_TIMETABLE_START,
    getSectionTimetable
  );
  yield takeLatest(ActionTypes.GET_STUDENT_TIME_OFF_START, getStudentTimeOff);
  yield takeLatest(
    ActionTypes.GET_COMMUNICATION_CATEGORY_START,
    getCommunicationCategory
  );
  yield takeLatest(
    ActionTypes.GET_STUDENT_LEAVE_APPLY_START,
    getStudentLeaveApply
  );
  yield takeLatest(
    ActionTypes.CREATE_STUDENT_LEAVE_APPLY_START,
    createStudentLeaveApply
  );
  yield takeLatest(
    ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_START,
    updateStudentLeaveApply
  );
  yield takeLatest(
    ActionTypes.DELETE_STUDENT_LEAVE_APPLY_START,
    deleteStudentLeaveApply
  );
  yield takeLatest(ActionTypes.GET_TICKET_START, getTickets);
  yield takeLatest(ActionTypes.CREATE_TICKET_START, createTickets);
  yield takeLatest(ActionTypes.GET_ONE_TICKET_INFO_START, getTicketInfo);
  yield takeLatest(ActionTypes.ADD_MESSAGE_TO_TICKET_START, addMessageToTicket);
  yield takeLatest(ActionTypes.GET_EXAM_ROSTER_START, getExamRoster);
  yield takeLatest(ActionTypes.GET_ONE_EXAM_DATA_START, getOneExamData);
  yield takeLatest(
    ActionTypes.GET_SECTION_COURSE_DETAILS_START,
    getSectionCourseDetails
  );
  yield takeLatest(
    ActionTypes.SET_NOTIFICATION_TOKEN_START,
    setNotificationToken
  );
  yield takeLatest(
    ActionTypes.GET_ATTENDANCE_STATUS_START,
    getAttendanceStatus
  );
  yield takeLatest(ActionTypes.GET_ALL_EVENTS_START, getAllEvents);
  yield takeLatest(ActionTypes.GET_NOTIFICATION_START, getNotification);
  yield takeLatest(
    ActionTypes.GET_NOTIFICATION_SETTINGS_START,
    getNotificationSettings
  );
  yield takeLatest(
    ActionTypes.UPDATE_NOTIFICATION_SETTINGS_START,
    updateNotificationSettings
  );
  yield takeLatest(ActionTypes.UPDATE_NOTIFICATION_START, updateNotification);
}

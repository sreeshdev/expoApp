import * as ActionTypes from "./action.types";
export const whoAmI = (req) => ({
  type: ActionTypes.WHO_AM_I_START,
  payload: req,
});

export const whoAmISuccess = (req) => {
  return {
    type: ActionTypes.WHO_AM_I_SUCCESS,
    payload: req,
  };
};
export const whoAmIRefreshSuccess = (req) => {
  return {
    type: ActionTypes.WHO_AM_I_REFRESH_SUCCESS,
    payload: req,
  };
};
export const whoAmIFailure = (error) => ({
  type: ActionTypes.WHO_AM_I_FAILURE,
  payload: error,
});

export const login = (req) => ({
  type: ActionTypes.LOGIN_START,
  payload: req,
});

export const loginSuccess = (req) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: req,
  };
};
export const loginFailure = (error) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: error,
});

export const getToken = (req) => ({
  type: ActionTypes.GET_TOKEN_START,
  payload: req,
});

export const getTokenSuccess = (req) => {
  return {
    type: ActionTypes.GET_TOKEN_SUCCESS,
    payload: req,
  };
};
export const getTokenFailure = (error) => ({
  type: ActionTypes.GET_TOKEN_FAILURE,
  payload: error,
});

export const logout = (req) => ({
  type: ActionTypes.LOGOUT_START,
  payload: req,
});

export const logoutSuccess = (req) => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
    payload: req,
  };
};
export const logoutFailure = (error) => ({
  type: ActionTypes.LOGOUT_FAILURE,
  payload: error,
});

export const getStudentList = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_LIST_START,
  payload: req,
});

export const getStudentListSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_LIST_SUCCESS,
    payload: req,
  };
};
export const getStudentListFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_LIST_FAILURE,
  payload: error,
});

export const setStudentPreference = (req: Object) => ({
  type: ActionTypes.SET_STUDENT_PREFERENCE_START,
  payload: req,
});

export const setStudentPreferenceSuccess = (req: Object) => {
  return {
    type: ActionTypes.SET_STUDENT_PREFERENCE_SUCCESS,
    payload: req,
  };
};
export const setStudentPreferenceFailure = (error: Object) => ({
  type: ActionTypes.SET_STUDENT_PREFERENCE_FAILURE,
  payload: error,
});

export const getStudentDetails = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_DETAILS_START,
  payload: req,
});

export const getStudentDetailsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_DETAILS_SUCCESS,
    payload: req,
  };
};
export const getStudentDetailsFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_DETAILS_FAILURE,
  payload: error,
});

/*Get StudentAttendanceStats*/
export const getStudentAttendanceStats = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_ATTENDANCE_STATS_START,
  payload: req,
});

export const getStudentAttendanceStatsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_ATTENDANCE_STATS_SUCCESS,
    payload: req,
  };
};
export const getStudentAttendanceStatsFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_ATTENDANCE_STATS_FAILURE,
  payload: error,
});

export const getStudentIndividualAttendance = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_START,
  payload: req,
});

export const getStudentIndividualAttendanceSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_SUCCESS,
    payload: req,
  };
};
export const getStudentIndividualAttendanceFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_FAILURE,
  payload: error,
});

export const getStudentExamStats = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_EXAM_STATS_START,
  payload: req,
});

export const getStudentExamStatsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_EXAM_STATS_SUCCESS,
    payload: req,
  };
};
export const getStudentExamStatsFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_EXAM_STATS_FAILURE,
  payload: error,
});

export const getOtp = (req) => ({
  type: ActionTypes.GET_OTP_START,
  payload: req,
});

export const getOtpSuccess = (req) => {
  return {
    type: ActionTypes.GET_OTP_SUCCESS,
    payload: req,
  };
};
export const getOtpFailure = (error) => ({
  type: ActionTypes.GET_OTP_FAILURE,
  payload: error,
});

export const verifyOtp = (req) => ({
  type: ActionTypes.VERIFY_OTP_START,
  payload: req,
});

export const verifyOtpSuccess = (req) => {
  return {
    type: ActionTypes.VERIFY_OTP_SUCCESS,
    payload: req,
  };
};
export const verifyOtpFailure = (error) => ({
  type: ActionTypes.VERIFY_OTP_FAILURE,
  payload: error,
});

export const getSectionTimetable = (req) => ({
  type: ActionTypes.GET_SECTION_TIMETABLE_START,
  payload: req,
});

export const getSectionTimetableSuccess = (req) => {
  return {
    type: ActionTypes.GET_SECTION_TIMETABLE_SUCCESS,
    payload: req,
  };
};
export const getSectionTimetableFailure = (error) => ({
  type: ActionTypes.GET_SECTION_TIMETABLE_FAILURE,
  payload: error,
});

export const getActivitySummary = (req: Object) => ({
  type: ActionTypes.GET_ACTIVITY_SUMMARY_START,
  payload: req,
});

export const getActivitySummarySuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_ACTIVITY_SUMMARY_SUCCESS,
    payload: req,
  };
};

export const getActivitySummaryFailure = (error: Object) => ({
  type: ActionTypes.GET_ACTIVITY_SUMMARY_FAILURE,
  payload: error,
});

export const getStudentTimeOff = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_TIME_OFF_START,
  payload: req,
});

export const getStudentTimeOffSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_TIME_OFF_SUCCESS,
    payload: req,
  };
};

export const getStudentTimeOffFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_TIME_OFF_FAILURE,
  payload: error,
});

export const getCommunicationCategory = (req: Object) => ({
  type: ActionTypes.GET_COMMUNICATION_CATEGORY_START,
  payload: req,
});

export const getCommunicationCategorySuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_COMMUNICATION_CATEGORY_SUCCESS,
    payload: req,
  };
};

export const getCommunicationCategoryFailure = (error: Object) => ({
  type: ActionTypes.GET_COMMUNICATION_CATEGORY_FAILURE,
  payload: error,
});

export const getStudentLeaveApply = (req: Object) => ({
  type: ActionTypes.GET_STUDENT_LEAVE_APPLY_START,
  payload: req,
});

export const getStudentLeaveApplySuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_STUDENT_LEAVE_APPLY_SUCCESS,
    payload: req,
  };
};

export const getStudentLeaveApplyFailure = (error: Object) => ({
  type: ActionTypes.GET_STUDENT_LEAVE_APPLY_FAILURE,
  payload: error,
});

export const createStudentLeaveApply = (req: Object) => ({
  type: ActionTypes.CREATE_STUDENT_LEAVE_APPLY_START,
  payload: req,
});

export const createStudentLeaveApplySuccess = (req: Object) => {
  return {
    type: ActionTypes.CREATE_STUDENT_LEAVE_APPLY_SUCCESS,
    payload: req,
  };
};

export const createStudentLeaveApplyFailure = (error: Object) => ({
  type: ActionTypes.CREATE_STUDENT_LEAVE_APPLY_FAILURE,
  payload: error,
});

export const updateStudentLeaveApply = (req: Object) => ({
  type: ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_START,
  payload: req,
});

export const updateStudentLeaveApplySuccess = (req: Object) => {
  return {
    type: ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_SUCCESS,
    payload: req,
  };
};

export const updateStudentLeaveApplyFailure = (error: Object) => ({
  type: ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_FAILURE,
  payload: error,
});

export const deleteStudentLeaveApply = (req: Object) => ({
  type: ActionTypes.DELETE_STUDENT_LEAVE_APPLY_START,
  payload: req,
});

export const deleteStudentLeaveApplySuccess = (req: Object) => {
  return {
    type: ActionTypes.DELETE_STUDENT_LEAVE_APPLY_SUCCESS,
    payload: req,
  };
};

export const deleteStudentLeaveApplyFailure = (error: Object) => ({
  type: ActionTypes.DELETE_STUDENT_LEAVE_APPLY_FAILURE,
  payload: error,
});

export const getTickets = (req: Object) => ({
  type: ActionTypes.GET_TICKET_START,
  payload: req,
});

export const getTicketsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_TICKET_SUCCESS,
    payload: req,
  };
};

export const getTicketsFailure = (error: Object) => ({
  type: ActionTypes.GET_TICKET_FAILURE,
  payload: error,
});

export const createTickets = (req: Object) => ({
  type: ActionTypes.CREATE_TICKET_START,
  payload: req,
});

export const createTicketsSuccess = (req: Object) => {
  return {
    type: ActionTypes.CREATE_TICKET_SUCCESS,
    payload: req,
  };
};

export const createTicketsFailure = (error: Object) => ({
  type: ActionTypes.CREATE_TICKET_FAILURE,
  payload: error,
});

export const getTicketInfo = (req: Object) => ({
  type: ActionTypes.GET_ONE_TICKET_INFO_START,
  payload: req,
});

export const getTicketInfoSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_ONE_TICKET_INFO_SUCCESS,
    payload: req,
  };
};

export const getTicketInfoFailure = (error: Object) => ({
  type: ActionTypes.GET_ONE_TICKET_INFO_FAILURE,
  payload: error,
});

export const addMessageToTicket = (req: Object) => ({
  type: ActionTypes.ADD_MESSAGE_TO_TICKET_START,
  payload: req,
});

export const addMessageToTicketSuccess = (req: Object) => {
  return {
    type: ActionTypes.ADD_MESSAGE_TO_TICKET_SUCCESS,
    payload: req,
  };
};

export const addMessageToTicketFailure = (error: Object) => ({
  type: ActionTypes.ADD_MESSAGE_TO_TICKET_FAILURE,
  payload: error,
});

export const getOneExamData = (req: Object) => ({
  type: ActionTypes.GET_ONE_EXAM_DATA_START,
  payload: req,
});

export const getOneExamDataSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_ONE_EXAM_DATA_SUCCESS,
    payload: req,
  };
};

export const getOneExamDataFailure = (error: Object) => ({
  type: ActionTypes.GET_ONE_EXAM_DATA_FAILURE,
  payload: error,
});

export const getExamRoster = (req: Object) => ({
  type: ActionTypes.GET_EXAM_ROSTER_START,
  payload: req,
});

export const getExamRosterSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_EXAM_ROSTER_SUCCESS,
    payload: req,
  };
};

export const getExamRosterFailure = (error: Object) => ({
  type: ActionTypes.GET_EXAM_ROSTER_FAILURE,
  payload: error,
});

/* Get Section Details */
export const getSectionCourseDetails = (req: Object) => ({
  type: ActionTypes.GET_SECTION_COURSE_DETAILS_START,
  payload: req,
});

export const getSectionCourseDetailsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_SECTION_COURSE_DETAILS_SUCCESS,
    payload: req,
  };
};

export const getSectionCourseDetailsFailure = (error: Object) => ({
  type: ActionTypes.GET_SECTION_COURSE_DETAILS_FAILURE,
  payload: error,
});

export const setNotificationToken = (req: Object) => ({
  type: ActionTypes.SET_NOTIFICATION_TOKEN_START,
  payload: req,
});

export const setNotificationTokenSuccess = (req: Object) => {
  return {
    type: ActionTypes.SET_NOTIFICATION_TOKEN_SUCCESS,
    payload: req,
  };
};

export const setNotificationTokenFailure = (error: Object) => ({
  type: ActionTypes.SET_NOTIFICATION_TOKEN_FAILURE,
  payload: error,
});

/* Get Attendance Status Details */
export const getAttendanceStatus = (req: Object) => ({
  type: ActionTypes.GET_ATTENDANCE_STATUS_START,
  payload: req,
});

export const getAttendanceStatusSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_ATTENDANCE_STATUS_SUCCESS,
    payload: req,
  };
};

export const getAttendanceStatusFailure = (error: Object) => ({
  type: ActionTypes.GET_ATTENDANCE_STATUS_FAILURE,
  payload: error,
});

export const getAllEvents = (req: Object) => ({
  type: ActionTypes.GET_ALL_EVENTS_START,
  payload: req,
});

export const getAllEventsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_ALL_EVENTS_SUCCESS,
    payload: req,
  };
};

export const getAllEventsFailure = (error: Object) => ({
  type: ActionTypes.GET_ALL_EVENTS_FAILURE,
  payload: error,
});

export const getNotification = (req: Object) => ({
  type: ActionTypes.GET_NOTIFICATION_START,
  payload: req,
});

export const getNotificationSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_NOTIFICATION_SUCCESS,
    payload: req,
  };
};

export const getNotificationFailure = (error: Object) => ({
  type: ActionTypes.GET_NOTIFICATION_FAILURE,
  payload: error,
});

export const updateNotification = (req: Object) => ({
  type: ActionTypes.UPDATE_NOTIFICATION_START,
  payload: req,
});

export const updateNotificationSuccess = (req: Object) => {
  return {
    type: ActionTypes.UPDATE_NOTIFICATION_SUCCESS,
    payload: req,
  };
};

export const updateNotificationFailure = (error: Object) => ({
  type: ActionTypes.UPDATE_NOTIFICATION_FAILURE,
  payload: error,
});

export const getNotificationSettings = (req: Object) => ({
  type: ActionTypes.GET_NOTIFICATION_SETTINGS_START,
  payload: req,
});

export const getNotificationSettingsSuccess = (req: Object) => {
  return {
    type: ActionTypes.GET_NOTIFICATION_SETTINGS_SUCCESS,
    payload: req,
  };
};

export const getNotificationSettingsFailure = (error: Object) => ({
  type: ActionTypes.GET_NOTIFICATION_SETTINGS_FAILURE,
  payload: error,
});

export const updateNotificationSettings = (req: Object) => ({
  type: ActionTypes.UPDATE_NOTIFICATION_SETTINGS_START,
  payload: req,
});

export const updateNotificationSettingsSuccess = (req: Object) => {
  return {
    type: ActionTypes.UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
    payload: req,
  };
};

export const updateNotificationSettingsFailure = (error: Object) => ({
  type: ActionTypes.UPDATE_NOTIFICATION_SETTINGS_FAILURE,
  payload: error,
});

export const changeStudentPageCardView = (req: Object) => {
  return {
    type: ActionTypes.CHANGE_STUDENT_PAGE_CARD_VIEW,
    payload: req,
  };
};

export const changeState = (req: Object) => ({
  type: ActionTypes.CHANGE_STATE,
  payload: req,
});

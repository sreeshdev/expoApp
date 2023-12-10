import * as ActionTypes from "./actions/action.types";

const initialState = {
  serviceError: "",
  reqStatus: "",
  isLoading: false,
  isContentLoading: false,
  isLoggedIn: false,
  notificationTokenSent: false,
  allCourseActivity: [],
  askUsCategories: [],
  leaveApplyReason: [],
  attendanceStatusDetails: {
    types: [],
  },
  notifications: {
    content: [],
    metadata: { totalPages: 1 },
  },
  studentPageCardView: "STATS",
  studentPageViewMode: "SCORE",
  studentPageEvaluationMode: "EXAM",
  studentAttendanceDateMode: "DAILY",
  homePageScoreView: "STATS",
  homePageAttendanceView: "STATS",
  notificationCount: null,
};

export default appBase = (state = initialState, action) => {
  switch (action.type) {
    /* Common Triggers */
    case ActionTypes.GET_OTP_START:
    case ActionTypes.LOGIN_START:
    case ActionTypes.GET_TOKEN_START:
    case ActionTypes.GET_STUDENT_DETAILS_START:
    case ActionTypes.CREATE_TICKET_START:
    case ActionTypes.CREATE_STUDENT_LEAVE_APPLY_START:
    case ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_START:
    case ActionTypes.DELETE_STUDENT_LEAVE_APPLY_START:
    case ActionTypes.GET_ONE_TICKET_INFO_START:
    case ActionTypes.GET_COMMUNICATION_CATEGORY_START:
    case ActionTypes.GET_STUDENT_TIME_OFF_START:
    case ActionTypes.VERIFY_OTP_START:
    case ActionTypes.GET_ONE_EXAM_DATA_START: {
      return {
        ...state,
        isLoading: true,
        reqStatus: action.type,
        serviceError: "",
      };
    }
    case ActionTypes.WHO_AM_I_START:
    case ActionTypes.GET_STUDENT_ATTENDANCE_STATS_START:
    case ActionTypes.GET_STUDENT_EXAM_STATS_START:
    case ActionTypes.GET_STUDENT_LIST_START:
    case ActionTypes.SET_STUDENT_PREFERENCE_START:
    case ActionTypes.GET_SECTION_TIMETABLE_START:
    case ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_START:
    case ActionTypes.GET_ACTIVITY_SUMMARY_START:
    case ActionTypes.GET_STUDENT_LEAVE_APPLY_START:
    case ActionTypes.GET_TICKET_START:
    case ActionTypes.GET_EXAM_ROSTER_START:
    case ActionTypes.GET_SECTION_COURSE_DETAILS_START:
    case ActionTypes.GET_ATTENDANCE_STATUS_START:
    case ActionTypes.ADD_MESSAGE_TO_TICKET_START:
    case ActionTypes.GET_ALL_EVENTS_START:
    case ActionTypes.GET_NOTIFICATION_SETTINGS_START:
    case ActionTypes.UPDATE_NOTIFICATION_SETTINGS_START: {
      return {
        ...state,
        isContentLoading: true,
        reqStatus: action.type,
        serviceError: "",
      };
    }
    case ActionTypes.UPDATE_NOTIFICATION_START:
    case ActionTypes.SET_NOTIFICATION_TOKEN_START: {
      return {
        ...state,
        reqStatus: action.type,
        serviceError: "",
      };
    }
    case ActionTypes.GET_NOTIFICATION_START: {
      return {
        ...state,
        isContentLoading: action.payload.page === 1 ? true : false,
        isLoading: action.payload.page === 1 ? false : true,
        reqStatus: action.type,
        serviceError: "",
      };
    }
    case ActionTypes.WHO_AM_I_FAILURE:
    case ActionTypes.GET_OTP_FAILURE:
    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.GET_TOKEN_FAILURE:
    case ActionTypes.GET_STUDENT_DETAILS_FAILURE:
    case ActionTypes.GET_STUDENT_ATTENDANCE_STATS_FAILURE:
    case ActionTypes.GET_STUDENT_EXAM_STATS_FAILURE:
    case ActionTypes.VERIFY_OTP_FAILURE:
    case ActionTypes.GET_STUDENT_LIST_FAILURE:
    case ActionTypes.SET_STUDENT_PREFERENCE_FAILURE:
    case ActionTypes.GET_SECTION_TIMETABLE_FAILURE:
    case ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_FAILURE:
    case ActionTypes.GET_COMMUNICATION_CATEGORY_FAILURE:
    case ActionTypes.GET_STUDENT_TIME_OFF_FAILURE:
    case ActionTypes.GET_STUDENT_LEAVE_APPLY_FAILURE:
    case ActionTypes.CREATE_STUDENT_LEAVE_APPLY_FAILURE:
    case ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_FAILURE:
    case ActionTypes.DELETE_STUDENT_LEAVE_APPLY_FAILURE:
    case ActionTypes.GET_TICKET_FAILURE:
    case ActionTypes.CREATE_TICKET_FAILURE:
    case ActionTypes.GET_ONE_TICKET_INFO_FAILURE:
    case ActionTypes.ADD_MESSAGE_TO_TICKET_FAILURE:
    case ActionTypes.GET_EXAM_ROSTER_FAILURE:
    case ActionTypes.GET_ONE_EXAM_DATA_FAILURE:
    case ActionTypes.SET_NOTIFICATION_TOKEN_FAILURE:
    case ActionTypes.GET_SECTION_COURSE_DETAILS_FAILURE:
    case ActionTypes.GET_ATTENDANCE_STATUS_FAILURE:
    case ActionTypes.GET_NOTIFICATION_FAILURE:
    case ActionTypes.GET_ALL_EVENTS_FAILURE:
    case ActionTypes.GET_NOTIFICATION_SETTINGS_FAILURE:
    case ActionTypes.UPDATE_NOTIFICATION_FAILURE:
    case ActionTypes.UPDATE_NOTIFICATION_SETTINGS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: { ...action.payload },
      };
    }
    case ActionTypes.GET_ACTIVITY_SUMMARY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: { ...action.payload },
        allCourseActivity: [],
      };
    }
    case ActionTypes.WHO_AM_I_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        parentDetails: { ...action.payload.parentIndividual },
        organizations: action.payload.organizations,
        studentList: action.payload.studentIndividuals,
        institutesList: action.payload.institutes,
      };
    }
    case ActionTypes.GET_OTP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        uid: action.payload.uid,
        did: action.payload.did,
      };
    }
    case ActionTypes.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
      };
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        sid: action.payload.sid,
        // isLoggedIn: true,
        // loginTokens: action.payload,
      };
    }
    case ActionTypes.GET_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        isLoggedIn: true,
        loginTokens: action.payload,
      };
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return {
        ...initialState,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        isLoggedIn: false,
        loginTokens: null,
      };
    }
    case ActionTypes.GET_STUDENT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        studentList: action.payload,
      };
    }
    case ActionTypes.GET_STUDENT_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        studentDetails: action.payload,
      };
    }
    case ActionTypes.GET_STUDENT_ATTENDANCE_STATS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        attendanceStats: action.payload,
      };
    }
    case ActionTypes.GET_STUDENT_EXAM_STATS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        examStats: action.payload,
      };
    }
    case ActionTypes.SET_STUDENT_PREFERENCE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        parentDetails: { ...action.payload },
      };
    }
    case ActionTypes.GET_SECTION_TIMETABLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        sectionTimeTable: { ...action.payload },
      };
    }
    case ActionTypes.GET_STUDENT_INDIVIDUAL_ATTENDANCE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        serviceError: "",
        individualAttendance: { ...action.payload },
      };
    }
    case ActionTypes.GET_ACTIVITY_SUMMARY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        allCourseActivity: action.payload,
      };
    }
    case ActionTypes.GET_COMMUNICATION_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        askUsCategories: action.payload,
      };
    }
    case ActionTypes.GET_STUDENT_TIME_OFF_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        leaveApplyReason: action.payload,
      };
    }
    case ActionTypes.GET_STUDENT_LEAVE_APPLY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        studentLeaveList: action.payload,
      };
    }
    case ActionTypes.GET_TICKET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        ticketList: action.payload,
      };
    }
    case ActionTypes.GET_ONE_TICKET_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        ticketInfo: action.payload,
      };
    }
    case ActionTypes.GET_EXAM_ROSTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        examsList: action.payload,
      };
    }
    case ActionTypes.GET_ONE_EXAM_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        examInfo: action.payload,
      };
    }
    case ActionTypes.GET_SECTION_COURSE_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        sectionCourseDetails: action.payload,
      };
    }
    case ActionTypes.SET_NOTIFICATION_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        notificationTokenSent: action.payload.status,
      };
    }
    case ActionTypes.GET_ATTENDANCE_STATUS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        attendanceStatusDetails: action.payload,
      };
    }
    case ActionTypes.GET_ALL_EVENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        events: action.payload,
      };
    }
    case ActionTypes.GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        notifications:
          action.payload?.metadata?.page === 1
            ? action.payload
            : {
                content: [
                  ...state.notifications?.content,
                  ...action.payload?.content,
                ],
                metadata: action.payload?.metadata,
              },
      };
    }
    case ActionTypes.GET_NOTIFICATION_SETTINGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
        notificationSettings: action.payload,
      };
    }

    case ActionTypes.CREATE_STUDENT_LEAVE_APPLY_SUCCESS:
    case ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_SUCCESS:
    case ActionTypes.DELETE_STUDENT_LEAVE_APPLY_SUCCESS:
    case ActionTypes.CREATE_TICKET_SUCCESS:
    case ActionTypes.ADD_MESSAGE_TO_TICKET_SUCCESS:
    case ActionTypes.UPDATE_NOTIFICATION_SUCCESS:
    case ActionTypes.UPDATE_NOTIFICATION_SETTINGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isContentLoading: false,
        reqStatus: action.type,
      };
    }
    case ActionTypes.CHANGE_STUDENT_PAGE_CARD_VIEW: {
      return {
        ...state,
        studentPageCardView: action.payload,
      };
    }
    case ActionTypes.CHANGE_STATE: {
      return {
        ...state,
        [action.payload.stateName]: action.payload.stateValue,
      };
    }
    default:
      return state;
  }
};

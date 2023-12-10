// @flow
import { combineReducers } from "redux";

// Import All Reducers to be combined at the app Level- Root Reducer

import AppBaseReducer from "../modules/reducer";

const appReducer = combineReducers({
  AppBaseReducer: AppBaseReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

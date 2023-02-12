import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slice/auth";
import common from "./slice/common";

const createRootReducer = () => {
  return combineReducers({
    common: common,
    auth: auth,
  });
};

export default createRootReducer;

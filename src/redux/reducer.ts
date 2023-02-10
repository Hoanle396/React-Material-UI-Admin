import { combineReducers } from "@reduxjs/toolkit";
import common from "./slice/common";

const createRootReducer = () => {
  return combineReducers({
    common: common,
  });
};

export default createRootReducer;

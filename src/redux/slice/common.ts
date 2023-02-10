import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type CommonState = {
  sidebarOpen: boolean;
};

const slice = createSlice({
  name: "common",
  initialState: {
    sidebarOpen: true,
  } as CommonState,
  reducers: {
    setOpenSidebar: (state: CommonState) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setOpenSidebar } = slice.actions;

export const getStatusSidebar = (state: RootState) => state.common.sidebarOpen;

export default slice.reducer;

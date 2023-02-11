import { __prod__ } from "@/utils/constant";
import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "@/redux/reducer";

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  devTools: !__prod__,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

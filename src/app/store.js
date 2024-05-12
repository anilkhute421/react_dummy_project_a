import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginSlice from "./Auth/Login/LoginStore";
import thunk from "redux-thunk";
import dashboardSlice from "../layout/Dashboard/DashboardStore";
import orderSlice from "../features/Orders/OrderStore";
import profileSlice from "../features/Profile/ProfileStore";
import pusherRealtimeSlice  from "../pusher/PusherStore";

const reducers = combineReducers({
  loginAuth: loginSlice,
  languageDirection: dashboardSlice,
  RestaurantOrder: orderSlice,
  profileDetails: profileSlice,
  pusherRealtime: pusherRealtimeSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

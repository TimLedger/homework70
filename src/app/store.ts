import { configureStore } from "@reduxjs/toolkit";
import {contactsReducers} from "../store/contactsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
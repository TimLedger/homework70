import {Contact, Contacts} from "../types";
import { createSlice } from "@reduxjs/toolkit";
import {contactsList, contactsOne, contactsAdd, contactsEdit, contactsDelete} from "./contactsThunk";

interface IShowsState {
    contacts: Contacts[] | [];
    contact: Contact | null;
    getLoading: boolean;
    postLoading: boolean;
    editLoading: boolean;
    deleteLoading: boolean;
}

const initialState: IShowsState = {
    contacts: [],
    contact: null,
    getLoading: false,
    postLoading: false,
    editLoading: false,
    deleteLoading: false,
};

const getContacts = createSlice({
    name: "shows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(contactsAdd.pending, state => {
            state.postLoading = true;
        });
        builder.addCase(contactsAdd.fulfilled, state => {
            state.postLoading = false;
        });
        builder.addCase(contactsAdd.rejected, state => {
            state.postLoading = false;
        });

        builder.addCase(contactsOne.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(contactsOne.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.contact = payload;
        });
        builder.addCase(contactsOne.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(contactsList.pending, state => {
            state.getLoading = true;
        });
        builder.addCase(contactsList.fulfilled, (state, {payload}) => {
            state.getLoading = false;
            state.contacts = payload;
        });
        builder.addCase(contactsList.rejected, state => {
            state.getLoading = false;
        });

        builder.addCase(contactsEdit.pending, state => {
            state.editLoading = true;
        });
        builder.addCase(contactsEdit.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(contactsEdit.rejected, state => {
            state.editLoading = false;
        });

        builder.addCase(contactsDelete.pending, state => {
            state.deleteLoading = true;
        });
        builder.addCase(contactsDelete.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(contactsDelete.rejected, state => {
            state.deleteLoading = false;
        });
    },
});

export const contactsReducers = getContacts.reducer;

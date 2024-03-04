import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiContact, Contact, Contacts} from "../types";

export const contactsAdd = createAsyncThunk<void, Contact>(
    "contacts/add",
    async (data) => {
        await axiosApi.post('/contacts.json', data);
    },
);

export const contactsOne = createAsyncThunk<Contact | null, string>(
    "contacts/one",
    async (id) => {
        const response = await axiosApi.get('/contacts/' + id + '.json');
        if (response.data) {
            return response.data;
        }

        return null;
    },
);

export const contactsList = createAsyncThunk<Contacts[], undefined>(
    "contacts/list",
    async () => {
        const response = await axiosApi.get<ApiContact | null>('/contacts.json');
        const responseData = response.data;
        let newContact: Contacts[] = [];

        if (responseData) {
            newContact = Object.keys(responseData).map((key) => {
                return {
                    ...responseData[key],
                    id: key,
                };
            });
        }

        return newContact;
    },
);

export const contactsEdit = createAsyncThunk<void, { id: string; data: Contact }>(
    "contacts/edit",
    async ({ id, data }) => {
        await axiosApi.put('/contacts/' + id + '.json', data);
    },
);

export const contactsDelete = createAsyncThunk(
    "contacts/delete",
    async (id: string) => {
        await axiosApi.delete('/contacts/' + id + '.json');
    },
);

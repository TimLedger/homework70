export interface Contact {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface Contacts {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface ApiContact {
    [id: string]: Contact;
}
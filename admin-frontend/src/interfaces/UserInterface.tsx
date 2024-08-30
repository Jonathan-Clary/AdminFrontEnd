import { NoteInterface } from "./NoteInterface";

export interface UserInterface {
    adminId?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    createdAt?: string;
    notes?: NoteInterface;
    master?: boolean;
    token: string;
}
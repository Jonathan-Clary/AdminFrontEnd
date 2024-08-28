import { NoteInterface } from "./NoteInterface";

export interface UserInterface {
    userId: string;
    adminId?: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    notes: NoteInterface;
    master: boolean;
}
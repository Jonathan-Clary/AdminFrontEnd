import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";
import { NoteInterface } from "./NoteInterface";

export interface SupportTicketInterface {
    supportTicketId: string;
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    status: TicketStatusEnum;
    description: string;
    type: TicketTypeEnum;
    createdAt: string;
    resolvedDate: string | null; 
    note: NoteInterface | null;
}
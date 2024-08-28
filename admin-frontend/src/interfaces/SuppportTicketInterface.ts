import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";

export interface SupportTicketInterface {
    supportTicketId?: number;
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    status: TicketStatusEnum;
    description: string;
    type: TicketTypeEnum;
    createdAt: string;
    resolvedDate: string | null; 
    note: string | null;
}
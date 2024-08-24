import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";

export interface SupportTicketInterface {
    supportTicketId?: number;
    // User HERE
    status: TicketStatusEnum;
    description: string;
    type: TicketTypeEnum;
    createdAt?: Date;
    resolvedAt?: Date;
}
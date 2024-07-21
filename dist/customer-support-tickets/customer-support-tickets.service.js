"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportTicketService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.customerSupportTicketService = {
    list: async () => {
        const tickets = await db_1.default.query.CustomerSupportTicketsTable.findMany({
            columns: {
                ticketId: true,
                subject: true,
                description: true,
                status: true,
            },
            with: {
                user: {
                    columns: {
                        userId: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });
        return tickets;
    },
    getById: async (id) => {
        const ticket = await db_1.default.query.CustomerSupportTicketsTable.findFirst({
            columns: {
                ticketId: true,
                subject: true,
                description: true,
                status: true,
            },
            where: (ticketsTable) => (0, drizzle_orm_1.eq)(ticketsTable.ticketId, id),
            with: {
                user: {
                    columns: {
                        userId: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });
        return ticket;
    },
    create: async (ticket) => {
        const result = await db_1.default
            .insert(schema_1.CustomerSupportTicketsTable)
            .values(ticket)
            .returning({
            ticketId: schema_1.CustomerSupportTicketsTable.ticketId,
            userId: schema_1.CustomerSupportTicketsTable.userId,
            subject: schema_1.CustomerSupportTicketsTable.subject,
            description: schema_1.CustomerSupportTicketsTable.description,
            status: schema_1.CustomerSupportTicketsTable.status,
        })
            .execute();
        return result[0];
    },
    update: async (id, ticket) => {
        const result = await db_1.default
            .update(schema_1.CustomerSupportTicketsTable)
            .set(ticket)
            .where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id))
            .returning({
            ticketId: schema_1.CustomerSupportTicketsTable.ticketId,
            userId: schema_1.CustomerSupportTicketsTable.userId,
            subject: schema_1.CustomerSupportTicketsTable.subject,
            description: schema_1.CustomerSupportTicketsTable.description,
            status: schema_1.CustomerSupportTicketsTable.status,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.CustomerSupportTicketsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id))
            .returning({
            ticketId: schema_1.CustomerSupportTicketsTable.ticketId,
        })
            .execute();
        return result.length > 0;
    },
};

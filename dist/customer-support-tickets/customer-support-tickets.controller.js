"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.listTickets = void 0;
const customer_support_tickets_service_1 = require("./customer-support-tickets.service");
const listTickets = async (c) => {
    const data = await customer_support_tickets_service_1.customerSupportTicketService.list();
    if (!data || data.length === 0) {
        return c.text("No customer support tickets found", 404);
    }
    return c.json(data, 200);
};
exports.listTickets = listTickets;
const getTicketById = async (c) => {
    const id = c.req.param("id");
    const data = await customer_support_tickets_service_1.customerSupportTicketService.getById(Number(id));
    if (!data) {
        return c.text("Customer support ticket not found", 404);
    }
    return c.json(data, 200);
};
exports.getTicketById = getTicketById;
const createTicket = async (c) => {
    try {
        const ticket = await c.req.json();
        const newTicket = await customer_support_tickets_service_1.customerSupportTicketService.create(ticket);
        return c.json(newTicket, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createTicket = createTicket;
const updateTicket = async (c) => {
    const id = c.req.param("id");
    const ticket = await c.req.json();
    const updatedTicket = await customer_support_tickets_service_1.customerSupportTicketService.update(Number(id), ticket);
    if (!updatedTicket) {
        return c.text("Customer support ticket not found", 404);
    }
    return c.json(updatedTicket, 200);
};
exports.updateTicket = updateTicket;
const deleteTicket = async (c) => {
    const id = c.req.param("id");
    const deleted = await customer_support_tickets_service_1.customerSupportTicketService.delete(Number(id));
    if (!deleted) {
        return c.text("Customer support ticket not found", 404);
    }
    return c.text("Customer support ticket deleted", 200);
};
exports.deleteTicket = deleteTicket;

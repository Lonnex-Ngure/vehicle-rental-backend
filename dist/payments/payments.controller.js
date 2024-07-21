"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPayment = exports.createPaymentIntent = exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPaymentById = exports.listPayments = void 0;
const payments_service_1 = require("./payments.service");
const validators_1 = require("../validators");
const listPayments = async (c) => {
    const data = await payments_service_1.paymentService.list();
    if (!data || data.length === 0) {
        return c.text("No payments found", 404);
    }
    return c.json(data, 200);
};
exports.listPayments = listPayments;
const getPaymentById = async (c) => {
    const id = c.req.param("id");
    const data = await payments_service_1.paymentService.getById(Number(id));
    if (!data) {
        return c.text("Payment not found", 404);
    }
    return c.json(data, 200);
};
exports.getPaymentById = getPaymentById;
const createPayment = async (c) => {
    const payment = await c.req.json();
    const parsedPayment = validators_1.paymentSchema.parse({
        ...payment,
        paymentDate: new Date(payment.paymentDate),
    });
    const newPayment = await payments_service_1.paymentService.create(parsedPayment);
    return c.json(newPayment, 201);
};
exports.createPayment = createPayment;
const updatePayment = async (c) => {
    const id = c.req.param("id");
    const payment = await c.req.json();
    const parsedPayment = validators_1.paymentSchema.parse({
        ...payment,
        paymentDate: new Date(payment.paymentDate),
    });
    const updatedPayment = await payments_service_1.paymentService.update(Number(id), parsedPayment);
    if (!updatedPayment) {
        return c.text("Payment not found", 404);
    }
    return c.json(updatedPayment, 200);
};
exports.updatePayment = updatePayment;
const deletePayment = async (c) => {
    const id = c.req.param("id");
    const deleted = await payments_service_1.paymentService.delete(Number(id));
    if (!deleted) {
        return c.text("Payment not found", 404);
    }
    return c.text("Payment deleted", 200);
};
exports.deletePayment = deletePayment;
const createPaymentIntent = async (c) => {
    const { amount } = await c.req.json();
    const clientSecret = await payments_service_1.paymentService.createStripePaymentIntent(amount);
    return c.json({ clientSecret }, 200);
};
exports.createPaymentIntent = createPaymentIntent;
const processPayment = async (c) => {
    const { bookingId, paymentMethodId } = await c.req.json();
    try {
        const payment = await payments_service_1.paymentService.processPayment(Number(bookingId), paymentMethodId);
        return c.json(payment, 200);
    }
    catch (error) {
        console.error('Payment processing error:', error);
        if (error instanceof Error) {
            return c.json({ error: error.message }, 400);
        }
        else {
            return c.json({ error: 'An unknown error occurred' }, 500);
        }
    }
};
exports.processPayment = processPayment;

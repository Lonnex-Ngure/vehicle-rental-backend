"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.listBookings = void 0;
const bookings_service_1 = require("./bookings.service");
const validators_1 = require("../validators");
const listBookings = async (c) => {
    const data = await bookings_service_1.bookingService.list();
    if (!data || data.length === 0) {
        return c.text("No bookings found", 404);
    }
    return c.json(data, 200);
};
exports.listBookings = listBookings;
const getBookingById = async (c) => {
    const id = c.req.param("id");
    const data = await bookings_service_1.bookingService.getById(Number(id));
    if (!data) {
        return c.text("Booking not found", 404);
    }
    return c.json(data, 200);
};
exports.getBookingById = getBookingById;
const createBooking = async (c) => {
    const booking = await c.req.json();
    // Validate and parse the booking data
    const parsedBooking = validators_1.bookingSchema.parse({
        ...booking,
        bookingDate: new Date(booking.bookingDate),
        returnDate: new Date(booking.returnDate),
    });
    const newBooking = await bookings_service_1.bookingService.create(parsedBooking);
    return c.json(newBooking, 201);
};
exports.createBooking = createBooking;
const updateBooking = async (c) => {
    const id = c.req.param("id");
    const booking = await c.req.json();
    // Validate and parse the booking data
    const parsedBooking = validators_1.bookingSchema.parse({
        ...booking,
        bookingDate: new Date(booking.bookingDate),
        returnDate: new Date(booking.returnDate),
    });
    const updatedBooking = await bookings_service_1.bookingService.update(Number(id), parsedBooking);
    if (!updatedBooking) {
        return c.text("Booking not found", 404);
    }
    return c.json(updatedBooking, 200);
};
exports.updateBooking = updateBooking;
const deleteBooking = async (c) => {
    const id = c.req.param("id");
    const deleted = await bookings_service_1.bookingService.delete(Number(id));
    if (!deleted) {
        return c.text("Booking not found", 404);
    }
    return c.text("Booking deleted", 200);
};
exports.deleteBooking = deleteBooking;

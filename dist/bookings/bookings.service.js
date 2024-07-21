"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.bookingService = {
    list: async () => {
        const bookings = await db_1.default.query.BookingsTable.findMany({
            columns: {
                bookingId: true,
                bookingDate: true,
                returnDate: true,
                totalAmount: true,
                bookingStatus: true,
            },
            with: {
                user: {
                    columns: {
                        userId: true,
                        fullName: true,
                        email: true,
                        contactPhone: true,
                        address: true,
                    },
                },
                vehicle: {
                    columns: {
                        vehicleSpecId: true,
                        rentalRate: true,
                        availability: true,
                    },
                },
                location: {
                    columns: {
                        locationId: true,
                        name: true,
                        address: true,
                        contactPhone: true,
                    },
                },
            },
        });
        return bookings;
    },
    getById: async (id) => {
        const booking = await db_1.default.query.BookingsTable.findFirst({
            columns: {
                bookingId: true,
                bookingDate: true,
                returnDate: true,
                totalAmount: true,
                bookingStatus: true,
            },
            where: (bookingsTable) => (0, drizzle_orm_1.eq)(bookingsTable.bookingId, id),
            with: {
                user: {
                    columns: {
                        userId: true,
                        fullName: true,
                        email: true,
                        contactPhone: true,
                        address: true,
                    },
                },
                vehicle: {
                    columns: {
                        vehicleSpecId: true,
                        rentalRate: true,
                        availability: true,
                    },
                },
                location: {
                    columns: {
                        locationId: true,
                        name: true,
                        address: true,
                        contactPhone: true,
                    },
                },
            },
        });
        return booking;
    },
    create: async (booking) => {
        const result = await db_1.default
            .insert(schema_1.BookingsTable)
            .values(booking)
            .returning({
            bookingId: schema_1.BookingsTable.bookingId,
            bookingDate: schema_1.BookingsTable.bookingDate,
            returnDate: schema_1.BookingsTable.returnDate,
            totalAmount: schema_1.BookingsTable.totalAmount,
            bookingStatus: schema_1.BookingsTable.bookingStatus,
            userId: schema_1.BookingsTable.userId,
            vehicleId: schema_1.BookingsTable.vehicleId,
            locationId: schema_1.BookingsTable.locationId,
        })
            .execute();
        return result[0];
    },
    update: async (id, booking) => {
        const result = await db_1.default
            .update(schema_1.BookingsTable)
            .set(booking)
            .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id))
            .returning({
            bookingDate: schema_1.BookingsTable.bookingDate,
            returnDate: schema_1.BookingsTable.returnDate,
            totalAmount: schema_1.BookingsTable.totalAmount,
            bookingStatus: schema_1.BookingsTable.bookingStatus,
            userId: schema_1.BookingsTable.userId,
            vehicleId: schema_1.BookingsTable.vehicleId,
            locationId: schema_1.BookingsTable.locationId,
            bookingId: schema_1.BookingsTable.bookingId
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.BookingsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id))
            .returning({
            bookingId: schema_1.BookingsTable.bookingId,
        })
            .execute();
        return result.length > 0;
    },
};

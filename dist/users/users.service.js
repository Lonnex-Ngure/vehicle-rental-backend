"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.userService = {
    list: async () => {
        const users = await db_1.default.query.UsersTable.findMany({
            columns: {
                userId: true,
                fullName: true,
                email: true,
                contactPhone: true,
                address: true,
                role: true,
            },
            with: {
                bookings: {
                    columns: {
                        bookingDate: true,
                        returnDate: true,
                        totalAmount: true,
                        bookingStatus: true,
                    },
                    with: {
                        vehicle: {
                            columns: {
                                vehicleSpecId: true,
                                rentalRate: true,
                                availability: true,
                            },
                        },
                        location: {
                            columns: {
                                name: true,
                                address: true,
                                contactPhone: true,
                            },
                        },
                    },
                },
                customerSupportTickets: {
                    columns: {
                        subject: true,
                        description: true,
                        status: true,
                    },
                },
            },
        });
        return users;
    },
    getById: async (id) => {
        return await db_1.default.query.UsersTable.findFirst({
            columns: {
                userId: true,
                fullName: true,
                email: true,
                contactPhone: true,
                address: true,
                role: true,
            },
            where: (usersTable) => (0, drizzle_orm_1.eq)(usersTable.userId, id),
            with: {
                bookings: {
                    columns: {
                        bookingDate: true,
                        returnDate: true,
                        totalAmount: true,
                        bookingStatus: true,
                    },
                    with: {
                        vehicle: {
                            columns: {
                                vehicleSpecId: true,
                                rentalRate: true,
                                availability: true,
                            },
                        },
                        location: {
                            columns: {
                                name: true,
                                address: true,
                                contactPhone: true,
                            },
                        },
                    },
                },
                customerSupportTickets: {
                    columns: {
                        subject: true,
                        description: true,
                        status: true,
                    },
                },
            },
        });
    },
    create: async (user) => {
        const result = await db_1.default
            .insert(schema_1.UsersTable)
            .values(user)
            .returning({
            userId: schema_1.UsersTable.userId,
            fullName: schema_1.UsersTable.fullName,
            email: schema_1.UsersTable.email,
            contactPhone: schema_1.UsersTable.contactPhone,
            address: schema_1.UsersTable.address,
            role: schema_1.UsersTable.role,
        })
            .execute();
        return result[0];
    },
    update: async (id, user) => {
        const result = await db_1.default
            .update(schema_1.UsersTable)
            .set(user)
            .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.userId, id))
            .returning({
            userId: schema_1.UsersTable.userId,
            fullName: schema_1.UsersTable.fullName,
            email: schema_1.UsersTable.email,
            contactPhone: schema_1.UsersTable.contactPhone,
            address: schema_1.UsersTable.address,
            role: schema_1.UsersTable.role,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.UsersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.userId, id))
            .returning({
            userId: schema_1.UsersTable.userId,
        })
            .execute();
        return result.length > 0;
    },
};

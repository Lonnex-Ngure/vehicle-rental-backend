"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const stripe_1 = __importDefault(require("../stripe"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.paymentService = {
    list: async () => {
        const payments = await db_1.default.query.PaymentsTable.findMany({
            columns: {
                amount: true,
                paymentStatus: true,
                paymentDate: true,
                paymentMethod: true,
                transactionId: true,
            },
            with: {
                booking: {
                    columns: {
                        bookingDate: true,
                        returnDate: true,
                        totalAmount: true,
                        bookingStatus: true,
                    },
                    with: {
                        user: {
                            columns: {
                                fullName: true,
                                email: true,
                            },
                        },
                        vehicle: {
                            columns: {
                                vehicleSpecId: true,
                                rentalRate: true,
                            },
                        },
                    },
                },
            },
        });
        return payments;
    },
    getById: async (id) => {
        const payment = await db_1.default.query.PaymentsTable.findFirst({
            columns: {
                amount: true,
                paymentStatus: true,
                paymentDate: true,
                paymentMethod: true,
                transactionId: true,
            },
            where: (paymentsTable) => (0, drizzle_orm_1.eq)(paymentsTable.paymentId, id),
            with: {
                booking: {
                    columns: {
                        bookingDate: true,
                        returnDate: true,
                        totalAmount: true,
                        bookingStatus: true,
                    },
                    with: {
                        user: {
                            columns: {
                                fullName: true,
                                email: true,
                            },
                        },
                        vehicle: {
                            columns: {
                                vehicleSpecId: true,
                                rentalRate: true,
                            },
                        },
                    },
                },
            },
        });
        return payment;
    },
    create: async (payment) => {
        const result = await db_1.default
            .insert(schema_1.PaymentsTable)
            .values(payment)
            .returning({
            paymentId: schema_1.PaymentsTable.paymentId,
            bookingId: schema_1.PaymentsTable.bookingId,
            amount: schema_1.PaymentsTable.amount,
            paymentStatus: schema_1.PaymentsTable.paymentStatus,
            paymentDate: schema_1.PaymentsTable.paymentDate,
            paymentMethod: schema_1.PaymentsTable.paymentMethod,
            transactionId: schema_1.PaymentsTable.transactionId,
        })
            .execute();
        return result[0];
    },
    update: async (id, payment) => {
        const result = await db_1.default
            .update(schema_1.PaymentsTable)
            .set(payment)
            .where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id))
            .returning({
            paymentId: schema_1.PaymentsTable.paymentId,
            bookingId: schema_1.PaymentsTable.bookingId,
            amount: schema_1.PaymentsTable.amount,
            paymentStatus: schema_1.PaymentsTable.paymentStatus,
            paymentDate: schema_1.PaymentsTable.paymentDate,
            paymentMethod: schema_1.PaymentsTable.paymentMethod,
            transactionId: schema_1.PaymentsTable.transactionId,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.PaymentsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id))
            .returning({
            paymentId: schema_1.PaymentsTable.paymentId,
        })
            .execute();
        return result.length > 0;
    },
    createStripePaymentIntent: async (amount, currency = 'usd') => {
        const paymentIntent = await stripe_1.default.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        });
        return paymentIntent.client_secret;
    },
    processPayment: async (bookingId, paymentMethodId) => {
        // Fetch booking details
        const booking = await db_1.default.query.BookingsTable.findFirst({
            where: (bookingsTable) => (0, drizzle_orm_1.eq)(bookingsTable.bookingId, bookingId),
            with: {
                user: true
            }
        });
        if (!booking) {
            throw new Error('Booking not found');
        }
        try {
            // Create a Stripe Customer
            const customer = await stripe_1.default.customers.create({
                email: booking.user.email,
                name: booking.user.fullName,
                payment_method: paymentMethodId,
            });
            // Create a PaymentIntent
            const paymentIntent = await stripe_1.default.paymentIntents.create({
                amount: booking.totalAmount * 100, // Stripe expects amount in cents
                currency: 'usd',
                customer: customer.id,
                payment_method: paymentMethodId,
                off_session: true,
                confirm: true,
            });
            if (paymentIntent.status === 'succeeded') {
                // Update booking status
                await db_1.default.update(schema_1.BookingsTable)
                    .set({ bookingStatus: 'Confirmed' })
                    .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, bookingId))
                    .execute();
                // Create payment record
                const payment = {
                    bookingId: bookingId,
                    amount: booking.totalAmount,
                    paymentStatus: 'Paid',
                    paymentDate: new Date(),
                    paymentMethod: 'Credit Card',
                    transactionId: paymentIntent.id,
                };
                const createdPayment = await db_1.default.insert(schema_1.PaymentsTable)
                    .values(payment)
                    .returning()
                    .execute();
                return createdPayment[0];
            }
            else {
                throw new Error('Payment failed');
            }
        }
        catch (error) {
            console.error('Error processing payment:', error);
            // If an error occurs, attempt to revert the booking status
            await db_1.default.update(schema_1.BookingsTable)
                .set({ bookingStatus: 'Pending' })
                .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, bookingId))
                .execute();
            throw error;
        }
    }
};

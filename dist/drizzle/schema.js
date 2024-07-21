"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRelations = exports.paymentsRelations = exports.bookingsRelations = exports.vehiclesRelations = exports.vehicleSpecificationsRelations = exports.customerSupportTicketsRelations = exports.authenticationRelations = exports.usersRelations = exports.FleetManagementTable = exports.CustomerSupportTicketsTable = exports.AuthenticationTable = exports.PaymentsTable = exports.BookingsTable = exports.LocationsTable = exports.VehiclesTable = exports.VehicleSpecificationsTable = exports.UsersTable = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enums
exports.userRoleEnum = (0, pg_core_1.pgEnum)("user_role", ["user", "admin"]);
// Users Table
exports.UsersTable = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.serial)("user_id").primaryKey(),
    fullName: (0, pg_core_1.text)("full_name").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    contactPhone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }).notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    role: (0, exports.userRoleEnum)("role").default("user").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Vehicle Specifications Table
exports.VehicleSpecificationsTable = (0, pg_core_1.pgTable)("vehicle_specifications", {
    vehicleSpecId: (0, pg_core_1.serial)("vehicle_spec_id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 100 }).notNull(),
    model: (0, pg_core_1.varchar)("model", { length: 100 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    fuelType: (0, pg_core_1.varchar)("fuel_type", { length: 50 }).notNull(),
    engineCapacity: (0, pg_core_1.integer)("engine_capacity").notNull(),
    transmission: (0, pg_core_1.varchar)("transmission", { length: 50 }).notNull(),
    seatingCapacity: (0, pg_core_1.integer)("seating_capacity").notNull(),
    color: (0, pg_core_1.varchar)("color", { length: 50 }).notNull(),
    features: (0, pg_core_1.text)("features"),
    imageUrl: (0, pg_core_1.text)("image_url"),
});
// Vehicles Table
exports.VehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    vehicleId: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    vehicleSpecId: (0, pg_core_1.integer)("vehicle_spec_id")
        .notNull()
        .references(() => exports.VehicleSpecificationsTable.vehicleSpecId),
    rentalRate: (0, pg_core_1.integer)("rental_rate").notNull(), // Using integer for cents
    availability: (0, pg_core_1.boolean)("availability").notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Location and Branches Table
exports.LocationsTable = (0, pg_core_1.pgTable)("locations", {
    locationId: (0, pg_core_1.serial)("location_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    contactPhone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Bookings Table
exports.BookingsTable = (0, pg_core_1.pgTable)("bookings", {
    bookingId: (0, pg_core_1.serial)("booking_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.UsersTable.userId),
    vehicleId: (0, pg_core_1.integer)("vehicle_id")
        .notNull()
        .references(() => exports.VehiclesTable.vehicleId),
    locationId: (0, pg_core_1.integer)("location_id")
        .notNull()
        .references(() => exports.LocationsTable.locationId),
    bookingDate: (0, pg_core_1.timestamp)("booking_date").notNull(),
    returnDate: (0, pg_core_1.timestamp)("return_date").notNull(),
    totalAmount: (0, pg_core_1.integer)("total_amount").notNull(),
    bookingStatus: (0, pg_core_1.varchar)("booking_status", { length: 20 })
        .notNull()
        .default("Pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Payments Table
exports.PaymentsTable = (0, pg_core_1.pgTable)("payments", {
    paymentId: (0, pg_core_1.serial)("payment_id").primaryKey(),
    bookingId: (0, pg_core_1.integer)("booking_id")
        .notNull()
        .references(() => exports.BookingsTable.bookingId),
    amount: (0, pg_core_1.integer)("amount").notNull(), // Using integer for cents
    paymentStatus: (0, pg_core_1.varchar)("payment_status", { length: 20 })
        .notNull()
        .default("Pending"),
    paymentDate: (0, pg_core_1.timestamp)("payment_date").notNull(),
    paymentMethod: (0, pg_core_1.varchar)("payment_method", { length: 50 }).notNull(),
    transactionId: (0, pg_core_1.varchar)("transaction_id", { length: 100 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Authentication Table
exports.AuthenticationTable = (0, pg_core_1.pgTable)("authentications", {
    authId: (0, pg_core_1.serial)("auth_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.UsersTable.userId),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Customer Support Tickets Table
exports.CustomerSupportTicketsTable = (0, pg_core_1.pgTable)("customer_support_tickets", {
    ticketId: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.UsersTable.userId),
    subject: (0, pg_core_1.varchar)("subject", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 20 }).default("open").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Fleet Management Table
exports.FleetManagementTable = (0, pg_core_1.pgTable)("fleet_management", {
    fleetId: (0, pg_core_1.serial)("fleet_id").primaryKey(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id")
        .notNull()
        .references(() => exports.VehiclesTable.vehicleId),
    acquisitionDate: (0, pg_core_1.timestamp)("acquisition_date").notNull(),
    depreciationRate: (0, pg_core_1.integer)("depreciation_rate").notNull(), // Using integer for basis points
    currentValue: (0, pg_core_1.integer)("current_value").notNull(), // Using integer for cents
    maintenanceCost: (0, pg_core_1.integer)("maintenance_cost").notNull(), // Using integer for cents
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
// Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.UsersTable, ({ many, one }) => ({
    bookings: many(exports.BookingsTable),
    authentications: one(exports.AuthenticationTable),
    customerSupportTickets: many(exports.CustomerSupportTicketsTable),
}));
exports.authenticationRelations = (0, drizzle_orm_1.relations)(exports.AuthenticationTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.AuthenticationTable.userId],
        references: [exports.UsersTable.userId],
    }),
}));
exports.customerSupportTicketsRelations = (0, drizzle_orm_1.relations)(exports.CustomerSupportTicketsTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.CustomerSupportTicketsTable.userId],
        references: [exports.UsersTable.userId],
    }),
}));
exports.vehicleSpecificationsRelations = (0, drizzle_orm_1.relations)(exports.VehicleSpecificationsTable, ({ one }) => ({
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.VehicleSpecificationsTable.vehicleSpecId],
        references: [exports.VehiclesTable.vehicleId],
    }),
}));
exports.vehiclesRelations = (0, drizzle_orm_1.relations)(exports.VehiclesTable, ({ one, many }) => ({
    specification: one(exports.VehicleSpecificationsTable, {
        fields: [exports.VehiclesTable.vehicleSpecId],
        references: [exports.VehicleSpecificationsTable.vehicleSpecId],
    }),
    bookings: many(exports.BookingsTable),
}));
exports.bookingsRelations = (0, drizzle_orm_1.relations)(exports.BookingsTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.BookingsTable.userId],
        references: [exports.UsersTable.userId],
    }),
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.BookingsTable.vehicleId],
        references: [exports.VehiclesTable.vehicleId],
    }),
    location: one(exports.LocationsTable, {
        fields: [exports.BookingsTable.locationId],
        references: [exports.LocationsTable.locationId],
    }),
}));
exports.paymentsRelations = (0, drizzle_orm_1.relations)(exports.PaymentsTable, ({ one }) => ({
    booking: one(exports.BookingsTable, {
        fields: [exports.PaymentsTable.bookingId],
        references: [exports.BookingsTable.bookingId],
    }),
}));
exports.fleetManagementRelations = (0, drizzle_orm_1.relations)(exports.FleetManagementTable, ({ one }) => ({
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.FleetManagementTable.vehicleId],
        references: [exports.VehiclesTable.vehicleId],
    }),
}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registrationSchema = exports.fleetManagementSchema = exports.customerSupportTicketSchema = exports.authenticationSchema = exports.paymentSchema = exports.bookingSchema = exports.locationSchema = exports.vehicleSchema = exports.vehicleSpecificationSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
// Users Table Validators
exports.userSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    contactPhone: zod_1.z.string().min(1, "Contact phone is required").max(20),
    address: zod_1.z.string().min(1, "Address is required"),
    role: zod_1.z.enum(["user", "admin"]).default("user").optional(),
});
// Vehicle Specifications Table Validators
exports.vehicleSpecificationSchema = zod_1.z.object({
    manufacturer: zod_1.z.string().min(1, "Manufacturer is required").max(100),
    model: zod_1.z.string().min(1, "Model is required").max(100),
    year: zod_1.z.number().int().min(1886, "Year is not valid"), // The first automobile was made in 1886
    fuelType: zod_1.z.string().min(1, "Fuel type is required").max(50),
    engineCapacity: zod_1.z.number().int().positive("Engine capacity must be positive"),
    transmission: zod_1.z.string().min(1, "Transmission is required").max(50),
    seatingCapacity: zod_1.z
        .number()
        .int()
        .positive("Seating capacity must be positive"),
    color: zod_1.z.string().min(1, "Color is required").max(50),
    features: zod_1.z.string()
        .min(1, "Features are required")
        .refine((val) => val.includes("2-wheeler") || val.includes("4-wheeler"), { message: "Features must include either '2-wheeler' or '4-wheeler'" }),
});
// Vehicles Table Validators
exports.vehicleSchema = zod_1.z.object({
    vehicleSpecId: zod_1.z
        .number()
        .int()
        .positive("Vehicle specification ID must be positive"),
    rentalRate: zod_1.z.number().int().positive("Rental rate must be positive"),
    availability: zod_1.z.boolean().default(true),
});
// Locations Table Validators
exports.locationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    contactPhone: zod_1.z.string(),
});
// Bookings Table Validators
exports.bookingSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive("User ID must be positive"),
    vehicleId: zod_1.z.number().int().positive("Vehicle ID must be positive"),
    locationId: zod_1.z.number().int().positive("Location ID must be positive"),
    bookingDate: zod_1.z.preprocess((arg) => new Date(arg), zod_1.z.date()),
    returnDate: zod_1.z.preprocess((arg) => new Date(arg), zod_1.z.date()),
    totalAmount: zod_1.z.number().int().positive("Total amount must be positive"),
    bookingStatus: zod_1.z.string().min(1, "Booking status is required").max(20).default("Pending"),
});
// Payments Table Validators
exports.paymentSchema = zod_1.z.object({
    bookingId: zod_1.z.number().int().positive("Booking ID must be positive"),
    amount: zod_1.z.number().int().positive("Amount must be positive"),
    paymentStatus: zod_1.z
        .string()
        .min(1, "Payment status is required")
        .max(20)
        .default("Pending"),
    paymentDate: zod_1.z.preprocess((arg) => new Date(arg), zod_1.z.date()),
    paymentMethod: zod_1.z.string().min(1, "Payment method is required").max(50),
    transactionId: zod_1.z.string().min(1, "Transaction ID is required").max(100),
});
// Authentication Table Validators
exports.authenticationSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive("User ID must be positive").optional(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(255),
});
// Customer Support Tickets Table Validators
exports.customerSupportTicketSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive("User ID must be positive"),
    subject: zod_1.z.string().min(1, "Subject is required").max(255),
    description: zod_1.z.string().min(1, "Description is required"),
    //status: z.string().min(1, "Status is required").max(20),
});
// Fleet Management Table Validators
exports.fleetManagementSchema = zod_1.z.object({
    vehicleId: zod_1.z.number().int().positive("Vehicle ID must be positive"),
    acquisitionDate: zod_1.z.preprocess((arg) => new Date(arg), zod_1.z.date()),
    depreciationRate: zod_1.z
        .number()
        .int()
        .positive("Depreciation rate must be positive"),
    currentValue: zod_1.z.number().int().positive("Current value must be positive"),
    maintenanceCost: zod_1.z
        .number()
        .int()
        .positive("Maintenance cost must be positive"),
    status: zod_1.z.string().min(1, "Status is required").max(50),
});
exports.registrationSchema = exports.userSchema.extend({
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});

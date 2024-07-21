"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.vehicleService = {
    list: async () => {
        const vehicles = await db_1.default.query.VehiclesTable.findMany({
            columns: {
                vehicleId: true,
                vehicleSpecId: true,
                rentalRate: true,
                availability: true,
            },
            with: {
                specification: {
                    columns: {
                        manufacturer: true,
                        model: true,
                        year: true,
                        fuelType: true,
                        engineCapacity: true,
                        transmission: true,
                        seatingCapacity: true,
                        color: true,
                        features: true,
                        imageUrl: true,
                    },
                },
            },
        });
        return vehicles;
    },
    getById: async (id) => {
        return await db_1.default.query.VehiclesTable.findFirst({
            columns: {
                vehicleSpecId: true,
                rentalRate: true,
                availability: true,
            },
            where: (vehiclesTable) => (0, drizzle_orm_1.eq)(vehiclesTable.vehicleId, id),
            with: {
                specification: {
                    columns: {
                        manufacturer: true,
                        model: true,
                        year: true,
                        fuelType: true,
                        engineCapacity: true,
                        transmission: true,
                        seatingCapacity: true,
                        color: true,
                        features: true,
                        imageUrl: true,
                    },
                },
            },
        });
    },
    create: async (vehicle) => {
        const result = await db_1.default
            .insert(schema_1.VehiclesTable)
            .values(vehicle)
            .returning({
            vehicleId: schema_1.VehiclesTable.vehicleId,
            vehicleSpecId: schema_1.VehiclesTable.vehicleSpecId,
            rentalRate: schema_1.VehiclesTable.rentalRate,
            availability: schema_1.VehiclesTable.availability,
        })
            .execute();
        return result[0];
    },
    update: async (id, vehicle) => {
        const result = await db_1.default
            .update(schema_1.VehiclesTable)
            .set(vehicle)
            .where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id))
            .returning({
            vehicleId: schema_1.VehiclesTable.vehicleId,
            vehicleSpecId: schema_1.VehiclesTable.vehicleSpecId,
            rentalRate: schema_1.VehiclesTable.rentalRate,
            availability: schema_1.VehiclesTable.availability,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.VehiclesTable)
            .where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id))
            .returning({
            vehicleId: schema_1.VehiclesTable.vehicleId,
        })
            .execute();
        return result.length > 0;
    },
};

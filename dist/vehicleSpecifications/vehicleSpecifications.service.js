"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.vehicleSpecificationService = {
    list: async () => {
        const vehicleSpecifications = await db_1.default.query.VehicleSpecificationsTable.findMany({
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
            with: {
                vehicle: {
                    columns: {
                        vehicleId: true,
                        rentalRate: true,
                        availability: true,
                    },
                },
            },
        });
        return vehicleSpecifications.map((spec) => ({
            ...spec,
            vehicles: spec.vehicle ? [spec.vehicle] : [],
        }));
    },
    getById: async (id) => {
        return await db_1.default.query.VehicleSpecificationsTable.findFirst({
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
            where: (vehicleSpecificationsTable) => (0, drizzle_orm_1.eq)(vehicleSpecificationsTable.vehicleSpecId, id),
            with: {
                vehicle: {
                    columns: {
                        vehicleId: true,
                        rentalRate: true,
                        availability: true,
                    },
                },
            },
        });
    },
    create: async (vehicleSpec) => {
        const result = await db_1.default
            .insert(schema_1.VehicleSpecificationsTable)
            .values(vehicleSpec)
            .returning({
            vehicleSpecId: schema_1.VehicleSpecificationsTable.vehicleSpecId,
            manufacturer: schema_1.VehicleSpecificationsTable.manufacturer,
            model: schema_1.VehicleSpecificationsTable.model,
            year: schema_1.VehicleSpecificationsTable.year,
            fuelType: schema_1.VehicleSpecificationsTable.fuelType,
            engineCapacity: schema_1.VehicleSpecificationsTable.engineCapacity,
            transmission: schema_1.VehicleSpecificationsTable.transmission,
            seatingCapacity: schema_1.VehicleSpecificationsTable.seatingCapacity,
            color: schema_1.VehicleSpecificationsTable.color,
            features: schema_1.VehicleSpecificationsTable.features,
        })
            .execute();
        return result[0];
    },
    update: async (id, vehicleSpec) => {
        const result = await db_1.default
            .update(schema_1.VehicleSpecificationsTable)
            .set(vehicleSpec)
            .where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpecId, id))
            .returning({
            vehicleSpecId: schema_1.VehicleSpecificationsTable.vehicleSpecId,
            manufacturer: schema_1.VehicleSpecificationsTable.manufacturer,
            model: schema_1.VehicleSpecificationsTable.model,
            year: schema_1.VehicleSpecificationsTable.year,
            fuelType: schema_1.VehicleSpecificationsTable.fuelType,
            engineCapacity: schema_1.VehicleSpecificationsTable.engineCapacity,
            transmission: schema_1.VehicleSpecificationsTable.transmission,
            seatingCapacity: schema_1.VehicleSpecificationsTable.seatingCapacity,
            color: schema_1.VehicleSpecificationsTable.color,
            features: schema_1.VehicleSpecificationsTable.features,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.VehicleSpecificationsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpecId, id))
            .returning({
            vehicleSpecId: schema_1.VehicleSpecificationsTable.vehicleSpecId,
        })
            .execute();
        return result.length > 0;
    },
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.fleetManagementService = {
    list: async () => {
        const fleetItems = await db_1.default.query.FleetManagementTable.findMany({
            columns: {
                fleetId: true,
                acquisitionDate: true,
                depreciationRate: true,
                currentValue: true,
                maintenanceCost: true,
                status: true,
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
        return fleetItems;
    },
    getById: async (id) => {
        const fleetItem = await db_1.default.query.FleetManagementTable.findFirst({
            columns: {
                fleetId: true,
                acquisitionDate: true,
                depreciationRate: true,
                currentValue: true,
                maintenanceCost: true,
                status: true,
            },
            where: (fleetManagementTable) => (0, drizzle_orm_1.eq)(fleetManagementTable.fleetId, id),
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
        return fleetItem;
    },
    create: async (fleetItem) => {
        const result = await db_1.default
            .insert(schema_1.FleetManagementTable)
            .values(fleetItem)
            .returning({
            vehicleId: schema_1.FleetManagementTable.vehicleId,
            acquisitionDate: schema_1.FleetManagementTable.acquisitionDate,
            depreciationRate: schema_1.FleetManagementTable.depreciationRate,
            currentValue: schema_1.FleetManagementTable.currentValue,
            maintenanceCost: schema_1.FleetManagementTable.maintenanceCost,
            status: schema_1.FleetManagementTable.status,
        })
            .execute();
        return result[0];
    },
    update: async (id, fleetItem) => {
        const result = await db_1.default
            .update(schema_1.FleetManagementTable)
            .set(fleetItem)
            .where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleetId, id))
            .returning({
            vehicleId: schema_1.FleetManagementTable.vehicleId,
            acquisitionDate: schema_1.FleetManagementTable.acquisitionDate,
            depreciationRate: schema_1.FleetManagementTable.depreciationRate,
            currentValue: schema_1.FleetManagementTable.currentValue,
            maintenanceCost: schema_1.FleetManagementTable.maintenanceCost,
            status: schema_1.FleetManagementTable.status,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.FleetManagementTable)
            .where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleetId, id))
            .returning({
            fleetId: schema_1.FleetManagementTable.fleetId,
        })
            .execute();
        return result.length > 0;
    },
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.locationService = {
    list: async () => {
        return await db_1.default.query.LocationsTable.findMany({
            columns: {
                locationId: true,
                name: true,
                address: true,
                contactPhone: true,
            },
        });
    },
    getById: async (id) => {
        return await db_1.default.query.LocationsTable.findFirst({
            columns: {
                locationId: true,
                name: true,
                address: true,
                contactPhone: true,
            },
            where: (locationsTable) => (0, drizzle_orm_1.eq)(locationsTable.locationId, id),
        });
    },
    create: async (location) => {
        const result = await db_1.default
            .insert(schema_1.LocationsTable)
            .values(location)
            .returning({
            name: schema_1.LocationsTable.name,
            address: schema_1.LocationsTable.address,
            contactPhone: schema_1.LocationsTable.contactPhone,
        })
            .execute();
        return result[0];
    },
    update: async (id, location) => {
        const result = await db_1.default
            .update(schema_1.LocationsTable)
            .set(location)
            .where((0, drizzle_orm_1.eq)(schema_1.LocationsTable.locationId, id))
            .returning({
            name: schema_1.LocationsTable.name,
            address: schema_1.LocationsTable.address,
            contactPhone: schema_1.LocationsTable.contactPhone,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.LocationsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.LocationsTable.locationId, id))
            .returning({
            locationId: schema_1.LocationsTable.locationId,
        })
            .execute();
        return result.length > 0;
    },
};

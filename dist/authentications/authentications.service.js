"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.authenticationService = {
    list: async () => {
        const authentications = await db_1.default.query.AuthenticationTable.findMany({
            columns: {
                userId: true,
                password: true,
            },
            with: {
                user: {
                    columns: {
                        fullName: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
        return authentications;
    },
    getById: async (id) => {
        const authentication = await db_1.default.query.AuthenticationTable.findFirst({
            columns: {
                userId: true,
                password: true,
            },
            where: (authenticationTable) => (0, drizzle_orm_1.eq)(authenticationTable.authId, id),
            with: {
                user: {
                    columns: {
                        fullName: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
        return authentication;
    },
    create: async (authentication) => {
        const result = await db_1.default
            .insert(schema_1.AuthenticationTable)
            .values(authentication)
            .returning({
            authId: schema_1.AuthenticationTable.authId,
            userId: schema_1.AuthenticationTable.userId,
            password: schema_1.AuthenticationTable.password,
        })
            .execute();
        return result[0];
    },
    update: async (id, authentication) => {
        const result = await db_1.default
            .update(schema_1.AuthenticationTable)
            .set(authentication)
            .where((0, drizzle_orm_1.eq)(schema_1.AuthenticationTable.authId, id))
            .returning({
            authId: schema_1.AuthenticationTable.authId,
            userId: schema_1.AuthenticationTable.userId,
            password: schema_1.AuthenticationTable.password,
        })
            .execute();
        return result[0] || null;
    },
    delete: async (id) => {
        const result = await db_1.default
            .delete(schema_1.AuthenticationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.AuthenticationTable.authId, id))
            .returning({
            authId: schema_1.AuthenticationTable.authId,
        })
            .execute();
        return result.length > 0;
    },
};

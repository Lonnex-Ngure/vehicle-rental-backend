"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthUserService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAuthUserService = async (userId, hashedPassword) => {
    await db_1.default.insert(schema_1.AuthenticationTable).values({
        userId,
        password: hashedPassword,
    }).execute();
};
exports.createAuthUserService = createAuthUserService;
const userLoginService = async (email, password) => {
    const user = await db_1.default.query.UsersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.UsersTable.email, email),
    });
    if (!user)
        return null;
    const auth = await db_1.default.query.AuthenticationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.AuthenticationTable.userId, user.userId),
    });
    if (!auth)
        return null;
    const passwordMatch = await bcrypt_1.default.compare(password, auth.password);
    if (!passwordMatch)
        return null;
    return user;
};
exports.userLoginService = userLoginService;

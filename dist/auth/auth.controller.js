"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
require("dotenv/config");
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const users_service_1 = require("../users/users.service");
const registerUser = async (c) => {
    try {
        const userData = await c.req.json();
        const { password, ...userInfo } = userData;
        const createdUser = await users_service_1.userService.create(userInfo);
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await (0, auth_service_1.createAuthUserService)(createdUser.userId, hashedPassword);
        return c.json({ msg: "User registered successfully", user: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUser = registerUser;
const loginUser = async (c) => {
    try {
        const { email, password } = await c.req.json();
        const userExist = await (0, auth_service_1.userLoginService)(email, password);
        if (!userExist)
            return c.json({ error: "Invalid credentials" }, 401);
        const payload = {
            sub: userExist.userId.toString(),
            role: userExist.role,
            exp: Math.floor(Date.now() / 1000) + 60 * 180,
        };
        const secret = process.env.JWT_SECRET;
        const token = await (0, jwt_1.sign)(payload, secret);
        return c.json({ token, user: { ...userExist, role: userExist.role } }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;

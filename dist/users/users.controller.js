"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.listUsers = void 0;
const users_service_1 = require("./users.service");
const listUsers = async (c) => {
    const data = await users_service_1.userService.list();
    if (!data || data.length === 0) {
        return c.text("No users found", 404);
    }
    return c.json(data, 200);
};
exports.listUsers = listUsers;
const getUserById = async (c) => {
    const id = c.req.param("id");
    const data = await users_service_1.userService.getById(Number(id));
    if (!data) {
        return c.text("User not found", 404);
    }
    return c.json(data, 200);
};
exports.getUserById = getUserById;
const createUser = async (c) => {
    try {
        const userData = await c.req.json();
        const newUser = await users_service_1.userService.create(userData);
        return c.json(newUser, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
const updateUser = async (c) => {
    const id = c.req.param("id");
    const user = await c.req.json();
    const updatedUser = await users_service_1.userService.update(Number(id), user);
    if (!updatedUser) {
        return c.text("User not found", 404);
    }
    return c.json(updatedUser, 200);
};
exports.updateUser = updateUser;
const deleteUser = async (c) => {
    const id = c.req.param("id");
    const deleted = await users_service_1.userService.delete(Number(id));
    if (!deleted) {
        return c.text("User not found", 404);
    }
    return c.text("User deleted", 200);
};
exports.deleteUser = deleteUser;

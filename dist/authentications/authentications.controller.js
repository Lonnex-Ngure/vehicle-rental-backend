"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthentication = exports.updateAuthentication = exports.createAuthentication = exports.getAuthenticationById = exports.listAuthentications = void 0;
const authentications_service_1 = require("./authentications.service");
const listAuthentications = async (c) => {
    const data = await authentications_service_1.authenticationService.list();
    if (!data || data.length === 0) {
        return c.text("No authentications found", 404);
    }
    return c.json(data, 200);
};
exports.listAuthentications = listAuthentications;
const getAuthenticationById = async (c) => {
    const id = c.req.param("id");
    const data = await authentications_service_1.authenticationService.getById(Number(id));
    if (!data) {
        return c.text("Authentication not found", 404);
    }
    return c.json(data, 200);
};
exports.getAuthenticationById = getAuthenticationById;
const createAuthentication = async (c) => {
    try {
        const authentication = await c.req.json();
        const newAuthentication = await authentications_service_1.authenticationService.create(authentication);
        return c.json(newAuthentication, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createAuthentication = createAuthentication;
const updateAuthentication = async (c) => {
    const id = c.req.param("id");
    const authentication = await c.req.json();
    const updatedAuthentication = await authentications_service_1.authenticationService.update(Number(id), authentication);
    if (!updatedAuthentication) {
        return c.text("Authentication not found", 404);
    }
    return c.json(updatedAuthentication, 200);
};
exports.updateAuthentication = updateAuthentication;
const deleteAuthentication = async (c) => {
    const id = c.req.param("id");
    const deleted = await authentications_service_1.authenticationService.delete(Number(id));
    if (!deleted) {
        return c.text("Authentication not found", 404);
    }
    return c.text("Authentication deleted", 200);
};
exports.deleteAuthentication = deleteAuthentication;

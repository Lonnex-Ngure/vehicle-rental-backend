"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicleById = exports.listVehicles = void 0;
const vehicles_service_1 = require("./vehicles.service");
const listVehicles = async (c) => {
    const data = await vehicles_service_1.vehicleService.list();
    if (!data || data.length === 0) {
        return c.text("No vehicles found", 404);
    }
    return c.json(data, 200);
};
exports.listVehicles = listVehicles;
const getVehicleById = async (c) => {
    const id = c.req.param("id");
    const vehicleId = parseInt(id, 10);
    if (isNaN(vehicleId)) {
        return c.json({ error: "Invalid vehicle ID" }, 400);
    }
    try {
        const data = await vehicles_service_1.vehicleService.getById(vehicleId);
        if (!data) {
            return c.json({ error: "Vehicle not found" }, 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        console.error("Error fetching vehicle:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
};
exports.getVehicleById = getVehicleById;
const createVehicle = async (c) => {
    const vehicle = await c.req.json();
    const newVehicle = await vehicles_service_1.vehicleService.create(vehicle);
    return c.json(newVehicle, 201);
};
exports.createVehicle = createVehicle;
const updateVehicle = async (c) => {
    const id = c.req.param("id");
    const vehicle = await c.req.json();
    const updatedVehicle = await vehicles_service_1.vehicleService.update(Number(id), vehicle);
    if (!updatedVehicle) {
        return c.text("Vehicle not found", 404);
    }
    return c.json(updatedVehicle, 200);
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (c) => {
    const id = c.req.param("id");
    const deleted = await vehicles_service_1.vehicleService.delete(Number(id));
    if (!deleted) {
        return c.text("Vehicle not found", 404);
    }
    return c.text("Vehicle deleted", 200);
};
exports.deleteVehicle = deleteVehicle;

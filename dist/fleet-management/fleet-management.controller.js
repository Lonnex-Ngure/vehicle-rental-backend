"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetItem = exports.updateFleetItem = exports.createFleetItem = exports.getFleetItemById = exports.listFleetItems = void 0;
const fleet_management_service_1 = require("./fleet-management.service");
const validators_1 = require("../validators");
const listFleetItems = async (c) => {
    const data = await fleet_management_service_1.fleetManagementService.list();
    if (!data || data.length === 0) {
        return c.text("No fleet management items found", 404);
    }
    return c.json(data, 200);
};
exports.listFleetItems = listFleetItems;
const getFleetItemById = async (c) => {
    const id = c.req.param("id");
    const data = await fleet_management_service_1.fleetManagementService.getById(Number(id));
    if (!data) {
        return c.text("Fleet management item not found", 404);
    }
    return c.json(data, 200);
};
exports.getFleetItemById = getFleetItemById;
const createFleetItem = async (c) => {
    try {
        const fleetItem = await c.req.json();
        const parsedFleetItem = validators_1.fleetManagementSchema.parse({
            ...fleetItem,
            acquisitionDate: new Date(fleetItem.acquisitionDate),
        });
        const newFleetItem = await fleet_management_service_1.fleetManagementService.create(parsedFleetItem);
        return c.json(newFleetItem, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createFleetItem = createFleetItem;
const updateFleetItem = async (c) => {
    const id = c.req.param("id");
    const fleetItem = await c.req.json();
    const parsedFleetItem = validators_1.fleetManagementSchema.parse({
        ...fleetItem,
        acquisitionDate: new Date(fleetItem.acquisitionDate),
    });
    const updatedFleetItem = await fleet_management_service_1.fleetManagementService.update(Number(id), parsedFleetItem);
    if (!updatedFleetItem) {
        return c.text("Fleet management item not found", 404);
    }
    return c.json(updatedFleetItem, 200);
};
exports.updateFleetItem = updateFleetItem;
const deleteFleetItem = async (c) => {
    const id = c.req.param("id");
    const deleted = await fleet_management_service_1.fleetManagementService.delete(Number(id));
    if (!deleted) {
        return c.text("Fleet management item not found", 404);
    }
    return c.text("Fleet management item deleted", 200);
};
exports.deleteFleetItem = deleteFleetItem;

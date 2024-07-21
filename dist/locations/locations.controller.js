"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.listLocations = void 0;
const locations_service_1 = require("./locations.service");
const listLocations = async (c) => {
    const data = await locations_service_1.locationService.list();
    if (!data || data.length === 0) {
        return c.text("No locations found", 404);
    }
    return c.json(data, 200);
};
exports.listLocations = listLocations;
const getLocationById = async (c) => {
    const id = c.req.param("id");
    const data = await locations_service_1.locationService.getById(Number(id));
    if (!data) {
        return c.text("Location not found", 404);
    }
    return c.json(data, 200);
};
exports.getLocationById = getLocationById;
const createLocation = async (c) => {
    const location = await c.req.json();
    const newLocation = await locations_service_1.locationService.create(location);
    return c.json(newLocation, 201);
};
exports.createLocation = createLocation;
const updateLocation = async (c) => {
    const id = c.req.param("id");
    const location = await c.req.json();
    const updatedLocation = await locations_service_1.locationService.update(Number(id), location);
    if (!updatedLocation) {
        return c.text("Location not found", 404);
    }
    return c.json(updatedLocation, 200);
};
exports.updateLocation = updateLocation;
const deleteLocation = async (c) => {
    const id = c.req.param("id");
    const deleted = await locations_service_1.locationService.delete(Number(id));
    if (!deleted) {
        return c.text("Location not found", 404);
    }
    return c.text("Location deleted", 200);
};
exports.deleteLocation = deleteLocation;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecification = exports.updateVehicleSpecification = exports.createVehicleSpecification = exports.getVehicleSpecificationById = exports.listVehicleSpecifications = void 0;
const vehicleSpecifications_service_1 = require("./vehicleSpecifications.service");
const listVehicleSpecifications = async (c) => {
    const data = await vehicleSpecifications_service_1.vehicleSpecificationService.list();
    if (!data || data.length === 0) {
        return c.text("No vehicle specifications found", 404);
    }
    return c.json(data, 200);
};
exports.listVehicleSpecifications = listVehicleSpecifications;
const getVehicleSpecificationById = async (c) => {
    const id = c.req.param("id");
    const data = await vehicleSpecifications_service_1.vehicleSpecificationService.getById(Number(id));
    if (!data) {
        return c.text("Vehicle specification not found", 404);
    }
    return c.json(data, 200);
};
exports.getVehicleSpecificationById = getVehicleSpecificationById;
const createVehicleSpecification = async (c) => {
    const vehicleSpec = await c.req.json();
    const newVehicleSpec = await vehicleSpecifications_service_1.vehicleSpecificationService.create(vehicleSpec);
    return c.json(newVehicleSpec, 201);
};
exports.createVehicleSpecification = createVehicleSpecification;
const updateVehicleSpecification = async (c) => {
    const id = c.req.param("id");
    const vehicleSpec = await c.req.json();
    const updatedVehicleSpec = await vehicleSpecifications_service_1.vehicleSpecificationService.update(Number(id), vehicleSpec);
    if (!updatedVehicleSpec) {
        return c.text("Vehicle specification not found", 404);
    }
    return c.json(updatedVehicleSpec, 200);
};
exports.updateVehicleSpecification = updateVehicleSpecification;
const deleteVehicleSpecification = async (c) => {
    const id = c.req.param("id");
    const deleted = await vehicleSpecifications_service_1.vehicleSpecificationService.delete(Number(id));
    if (!deleted) {
        return c.text("Vehicle specification not found", 404);
    }
    return c.text("Vehicle specification deleted", 200);
};
exports.deleteVehicleSpecification = deleteVehicleSpecification;

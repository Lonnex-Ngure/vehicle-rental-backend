"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const locations_controller_1 = require("./locations.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.locationRouter = new hono_1.Hono();
exports.locationRouter.get("/locations", locations_controller_1.listLocations);
exports.locationRouter.get("/locations/:id", bearAuth_1.userRoleAuth, locations_controller_1.getLocationById);
exports.locationRouter.post("/locations", (0, zod_validator_1.zValidator)("json", validators_1.locationSchema), locations_controller_1.createLocation);
exports.locationRouter.put("/locations/:id", (0, zod_validator_1.zValidator)("json", validators_1.locationSchema), locations_controller_1.updateLocation);
exports.locationRouter.delete("/locations/:id", locations_controller_1.deleteLocation);

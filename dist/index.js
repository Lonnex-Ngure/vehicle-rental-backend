"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const users_router_1 = require("./users/users.router");
const vehicleSpecifications_router_1 = require("./vehicleSpecifications/vehicleSpecifications.router");
const vehicles_router_1 = require("./vehicles/vehicles.router");
const locations_router_1 = require("./locations/locations.router");
const bookings_router_1 = require("./bookings/bookings.router");
const payments_router_1 = require("./payments/payments.router");
const authentications_router_1 = require("./authentications/authentications.router");
const customer_support_tickets_router_1 = require("./customer-support-tickets/customer-support-tickets.router");
const fleet_management_router_1 = require("./fleet-management/fleet-management.router");
const auth_router_1 = require("./auth/auth.router");
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
app.use('*', (0, cors_1.cors)({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/api", users_router_1.userRouter);
app.route("/api", vehicleSpecifications_router_1.vehicleSpecRouter);
app.route("/api", vehicles_router_1.vehicleRouter);
app.route("/api", locations_router_1.locationRouter);
app.route("/api", bookings_router_1.bookingRouter);
app.route("/api", payments_router_1.paymentRouter);
app.route("/api", authentications_router_1.authenticationRouter);
app.route("/api", customer_support_tickets_router_1.customerSupportTicketRouter);
app.route("/api", fleet_management_router_1.fleetManagementRouter);
app.route("/api/auth", auth_router_1.authRouter);
console.log(`Server is running on port ${process.env.PORT}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
});

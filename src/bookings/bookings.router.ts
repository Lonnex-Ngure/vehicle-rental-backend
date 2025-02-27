import { Hono } from "hono";
import {
  listBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./bookings.controller";
import { zValidator } from "@hono/zod-validator";
import { bookingSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const bookingRouter = new Hono();

bookingRouter.get("/bookings", listBookings);
bookingRouter.get("/bookings/:id",  getBookingById);
bookingRouter.post("/bookings", zValidator("json", bookingSchema), createBooking);
bookingRouter.put("/bookings/:id", zValidator("json", bookingSchema), updateBooking);
bookingRouter.delete("/bookings/:id", deleteBooking);

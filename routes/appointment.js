import express from "express";
import {
  appointmentByPhone,
  appointmentId,
  createAppointment,
  listAppointment,
  readAppointment,
  removeAppointment,
  updateAppointment,
} from "../controllers/appointmentControllers";
import { userId } from "../controllers/userControllers";
import { authToken, isAuth, isStaff, requireSignin } from "../middleware/token";

const router = express.Router();

router.get("/list-appointment", listAppointment);
router.get("/list-appointment-by-phone", appointmentByPhone);
router.get("/read-appointment/:id", readAppointment);
router.post("/create-appointment", createAppointment);
router.put("/update-appointment/:id", updateAppointment);
router.delete(
  "/remove-appointment/:id",
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  removeAppointment
);

router.param("id", appointmentId);
router.param("userId", userId);

module.exports = router;

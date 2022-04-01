import express from "express";
import {
	listAppointment,
	appointmentId,
	readAppointment,
	removeAppointment,
	updateAppointment,
	createAppointment,
} from "../controllers/appointmentControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-appointment", listAppointment);
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

module.exports = router;

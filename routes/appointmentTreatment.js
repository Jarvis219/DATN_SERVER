import express from "express";
import {
  listTreatmentAppointment,
  treatmentId,
  removeTreatmentAppointment,
  updateTreatmentAppointment,
  createTreatmentAppointment,
  appointmentTreatmentByCustomer,
} from "../controllers/appointmentTreatmentControllers";
import { customerId } from "../controllers/customerControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list/appointment/treatment", listTreatmentAppointment);
router.get(
  "/list-appointment-treatment/:customer_id",
  appointmentTreatmentByCustomer
);
router.post(
  "/create/appointment/treatment",
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  createTreatmentAppointment
);
router.put(
  "/update/appointment/treatment/:id",
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  updateTreatmentAppointment
);
router.delete(
  "/remove/appointment/treatment/:id",
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  removeTreatmentAppointment
);

router.param("id", treatmentId);
router.param("customer_id", customerId);

module.exports = router;

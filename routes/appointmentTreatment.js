import express from 'express';
import {
  listTreatmentAppointment,
  treatmentId,
  removeTreatmentAppointment,
  updateTreatmentAppointment,
  createTreatmentAppointment,
} from '../controllers/appointmentTreatmentControllers';
import { authToken, requireSignin, isAuth, isStaff } from '../middleware/token';

const router = express.Router();

router.get('/list/appointment/treatment', listTreatmentAppointment);
router.post(
  '/create/appointment/treatment',
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  createTreatmentAppointment
);
router.put(
  '/update/appointment/treatment/:id',
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  updateTreatmentAppointment
);
router.delete(
  '/remove/appointment/treatment/:id',
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  removeTreatmentAppointment
);

router.param('id', treatmentId);

module.exports = router;

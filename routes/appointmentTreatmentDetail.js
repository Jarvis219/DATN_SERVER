import express from 'express';
import {
  listAppointmentTreatmentDetail,
  treatmentId,
  removeAppointmentTreatmentDetail,
  updateAppointmentTreatmentDetail,
  createAppointmentTreatmentDetail,
} from '../controllers/appointmentTreatmentDetailControllers';
import { authToken, requireSignin, isAuth, isStaff } from '../middleware/token';

const router = express.Router();

router.get(
  '/list/appointment/treatment/detail',
  listAppointmentTreatmentDetail
);
router.post(
  '/create/appointment/treatment/detail',
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  createAppointmentTreatmentDetail
);
router.put(
  '/update/appointment/treatment/detail/:id',
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  updateAppointmentTreatmentDetail
);
router.delete(
  '/remove/appointment/treatment/detail/:id',
  authToken,
  requireSignin,
  isAuth,
  isStaff,
  removeAppointmentTreatmentDetail
);

router.param('id', treatmentId);

module.exports = router;

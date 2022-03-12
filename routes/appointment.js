import express from 'express';
import {
  listAppointment,
  appointmentId,
  readAppointment,
  removeAppointment,
  updateAppointment,
  createAppointment,
} from '../controllers/appointmentControllers';

const router = express.Router();

router.get('/list-appointment', listAppointment);
router.get('/read-appointment/:id', appointmentId, readAppointment);
router.post('/create-appointment', createAppointment);
router.put('/update-appointment/:id', updateAppointment);
router.delete('/remove-appointment/:id', removeAppointment);

router.param('id', appointmentId);

module.exports = router;

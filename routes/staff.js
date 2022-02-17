import express from 'express';
import {
  listStaff,
  staffId,
  readStaff,
  removeStaff,
  updateStaff,
  createStaff,
  searchStaff,
} from '../controllers/staffControllers';

const router = express.Router();

router.get('/search-staff', searchStaff);
router.get('/list-staff', listStaff);
router.get('/read-staff/:id', readStaff);
router.post('/create-staff', createStaff);
router.put('/update-staff/:id', updateStaff);
router.delete('/remove-staff/:id', removeStaff);

router.param('id', staffId);

module.exports = router;

import express from 'express';
import {
  listWorkdayHistory,
  workdayHistoryId,
  readWorkdayHistory,
  removeWorkdayHistory,
  updateWorkdayHistory,
  createWorkdayHistory,
  findWorkDayHistoryByStaffId,
} from '../controllers/workdayHistoryControllers';

const router = express.Router();

router.get('/find/workday/history/by/staff', findWorkDayHistoryByStaffId);
router.get('/list/workday/history', listWorkdayHistory);
router.get('/read/workday/history/:id', readWorkdayHistory);
router.post('/create/workday/history', createWorkdayHistory);
router.put('/update/workday/history/:id', updateWorkdayHistory);
router.delete('/remove/workday/history/:id', removeWorkdayHistory);

router.param('id', workdayHistoryId);

module.exports = router;

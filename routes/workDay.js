import express from 'express';
import {
  listWorkDay,
  workDayId,
  readWorkDay,
  removeWorkDay,
  updateWorkDay,
  createWorkDay,
} from '../controllers/workDayControllers';

const router = express.Router();

router.get('/list/work/day', listWorkDay);
router.get('/read/work/day/:id', readWorkDay);
router.post('/create/work/day', createWorkDay);
router.put('/update/work/day/:id', updateWorkDay);
router.delete('/remove/work/day/:id', removeWorkDay);

router.param('id', workDayId);

module.exports = router;

import express from 'express';
import {
  listServiceHistory,
  serviceHistoryId,
  readServiceHistory,
  removeServiceHistory,
  createServiceHistory,
  updateServiceHistory,
  searchServiceHistory,
} from '../controllers/serviceHistoryControllers';

const router = express.Router();

router.get('/search/service/history', searchServiceHistory);
router.get('/list/service/history', listServiceHistory);
router.get('/read/service/history/:id', readServiceHistory);
router.post('/create/service/history', createServiceHistory);
router.put('/update/service/history/:id', updateServiceHistory);
router.delete('/remove/service/history/:id', removeServiceHistory);

router.param('id', serviceHistoryId);

module.exports = router;

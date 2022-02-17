import express from 'express';
import {
  listPosition,
  positionId,
  readPosition,
  removePositions,
  updatePosition,
  createPosition,
  searchPosition,
} from '../controllers/positionControllers';

const router = express.Router();

router.get('/search-position', searchPosition);
router.get('/list-position', listPosition);
router.get('/read-position/:id', readPosition);
router.post('/create-position', createPosition);
router.put('/update-position/:id', updatePosition);
router.delete('/remove-position/:id', removePositions);

router.param('id', positionId);

module.exports = router;

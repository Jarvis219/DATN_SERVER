import express from 'express';
import {
  listService,
  serviceId,
  readService,
  removeServices,
  createService,
  updateService,
  listServiceRelated,
  listSearch,
  filterCategory,
} from '../controllers/serviceControllers';

const router = express.Router();

router.get('/list-search/service', listSearch);
router.get('/filter-category', filterCategory);
router.get('/list-service', listService);
router.get('/list-related/service', listServiceRelated);
router.get('/read-service/:id', serviceId, readService);
router.post('/create-service', createService);
router.put('/update-service/:id', updateService);
router.delete('/remove-service/:id', removeServices);

router.param('id', serviceId);

module.exports = router;

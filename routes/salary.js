import express from 'express';
import {
  listSalary,
  salaryId,
  readSalary,
  removeSalary,
  updateSalary,
  createSalary,
  searchSalary,
  filterStaff,
} from '../controllers/salaryControllers';

const router = express.Router();

router.get('/filter-staff', filterStaff);
router.get('/search-salary', searchSalary);
router.get('/list-salary', listSalary);
router.get('/read-salary/:id', readSalary);
router.post('/create-salary', createSalary);
router.put('/update-salary/:id', updateSalary);
router.delete('/remove-salary/:id', removeSalary);

router.param('id', salaryId);

module.exports = router;

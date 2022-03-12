import express from 'express';
import {
  listCustomer,
  customerId,
  readCustomer,
  removeCustomer,
  updateCustomer,
  createCustomer,
  filterCustomerPhone,
} from '../controllers/customerControllers';

const router = express.Router();

router.get('/find-customer', filterCustomerPhone);
router.get('/list-customer', listCustomer);
router.get('/read-customer/:id', customerId, readCustomer);
router.post('/create-customer', createCustomer);
router.put('/update-customer/:id', updateCustomer);
router.delete('/remove-customer/:id', removeCustomer);

router.param('id', customerId);

module.exports = router;

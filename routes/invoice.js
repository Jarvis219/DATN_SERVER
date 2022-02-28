import express from 'express';
import {
  listInvoice,
  invoiceId,
  readInvoice,
  removeInvoice,
  updateInvoice,
  createInvoice,
} from '../controllers/invoiceControllers';

const router = express.Router();

router.get('/list-invoice', listInvoice);
router.get('/read-invoice/:id', readInvoice);
router.post('/create-invoice', createInvoice);
router.put('/update-invoice/:id', updateInvoice);
router.delete('/remove-invoice/:id', removeInvoice);

router.param('id', invoiceId);

module.exports = router;

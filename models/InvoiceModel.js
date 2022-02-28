import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const InvoiceSchema = new mongoose.Schema(
  {
    customer_id: {
      type: ObjectId,
      required: true,
      ref: 'Customer',
    },
    invoice_note: {
      type: String,
      maxLength: 1000,
    },
    invoice_price: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 100,
    },
    invoice_sale: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 100,
    },
    invoice_status: {
      type: Number,
      required: true,
      default: 0,
    },
    invoice_paid: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);

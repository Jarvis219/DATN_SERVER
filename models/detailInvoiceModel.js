import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const DetailInvoiceSchema = new mongoose.Schema(
  {
    service_id: {
      type: ObjectId,
      required: true,
      ref: 'Service',
    },
    invoice_id: {
      type: ObjectId,
      required: true,
      ref: 'Invoice',
    },
    staff_id: {
      type: ObjectId,
      required: true,
      ref: 'Staff',
    },
    detail_bill_price: {
      type: Number,
      required: true,
      default: 0,
    },
    detail_bill_sale: {
      type: Number,
      required: true,
      default: 0,
    },
    detail_bill_note: {
      type: String,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DetailInvoice', DetailInvoiceSchema);

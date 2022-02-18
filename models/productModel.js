import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    product_amount: {
      type: Number,
      required: true,
      maxLength: 21,
    },
    product_price: {
      type: Number,
      required: true,
      maxLength: 21,
    },
    product_sale: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 21,
    },
    product_star: {
      type: Number,
      required: true,
      default: 0,
      maxLength: 5,
    },
    product_description: {
      type: String,
      required: true,
      maxLength: 300,
    },
    product_content: {
      type: String,
    },
    product_album: {
      type: Array,
    },
    category_id: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', ProductSchema);
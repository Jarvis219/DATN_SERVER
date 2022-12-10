import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_amount: {
      type: Number,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_sale: {
      type: Number,
      required: true,
      default: 0,
    },
    product_star: {
      type: Number,
      required: true,
      default: 0,
      max: 5,
    },
    product_description: {
      type: String,
      required: true,
      default: 'Đang cập nhật',
    },
    product_content: {
      type: String,
    },
    product_album: {
      type: Array,
      required: true,
    },
    category_id: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    brand_id: {
      type: ObjectId,
      ref: 'Brand',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', ProductSchema);

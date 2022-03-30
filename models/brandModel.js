import mongoose from 'mongoose';
const BrandSchema = new mongoose.Schema(
  {
    brand_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    brand_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', BrandSchema);

import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    category_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);

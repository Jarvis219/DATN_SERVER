import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const PositionSchema = new mongoose.Schema(
  {
    position_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Position', PositionSchema);

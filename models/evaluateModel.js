import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const EvaluateSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    comment: {
      type: String,
    },
    star: {
      type: Number,
      default: 0,
      max: 5,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evaluate", EvaluateSchema);

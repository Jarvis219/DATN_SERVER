import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const EvaluateSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    product_id: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },

    comment: {
      type: String,
    },

    reply: {
      type: String,
    },

    star: {
      type: Number,
      default: 5,
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

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const CartSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    cart_products: {
        required: true,
        type: Array,
    },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
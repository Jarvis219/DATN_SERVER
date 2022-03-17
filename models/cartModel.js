import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const CartSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    cart_products: {
        default: [],
        type: Array,
    },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
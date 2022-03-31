import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const ServiceSchema = new mongoose.Schema(
	{
		service_name: {
			type: String,
			required: true,
			maxLength: 100,
		},
		service_price: {
			type: Number,
			required: true,
			maxLength: 21,
		},
		service_sale: {
			type: Number,
			required: true,
			default: 0,
			maxLength: 21,
		},
		service_star: {
			type: Number,
			required: true,
			default: 0,
			maxLength: 5,
		},
		service_description: {
			type: String,
			required: true,
			maxLength: 300,
		},
		service_content: {
			type: String,
		},
		service_album: {
			type: Array,
			required: true,
		},
		category_id: {
			type: ObjectId,
			ref: "Category",
			required: true,
		},
		service_time: {
			type: Number,
			required: true,
		},
		brand_id: {
			type: ObjectId,
			ref: "Brand",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Service", ServiceSchema);

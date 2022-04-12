import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const treatmentDetail = new mongoose.Schema(
	{
		treatment_id: {
			type: ObjectId,
			required: true,
			ref: "Treatment",
		},
		status: {
			type: Number,
			required: true,
			default: 0,
		},
		treaterments_detail_date: {
			type: String,
			required: true,
		},
		staff_id: {
			type: ObjectId,
			required: true,
			ref: "Staff",
		},
		customer_id: {
			type: ObjectId,
			required: true,
			ref: "Customer",
		},

		status_notification: {
			type: Number,
			default: 0,
			required: true,
		},
		description: {
			type: String,
		},
		number_treatment: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("TreatmentDetail", treatmentDetail);

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const serviceTreatmentSchema = new mongoose.Schema(
	{
		service_id: {
			type: ObjectId,
			required: true,
			ref: "Service",
		},
		treatment_id: {
			type: ObjectId,
			required: true,
			ref: "Treatment",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("ServiceTreatment", serviceTreatmentSchema);

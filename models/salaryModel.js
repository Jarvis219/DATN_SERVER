import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const SalarySchema = new mongoose.Schema(
	{
		salary_basic: {
			type: Number,
			required: true,
			default: 0,
			maxLength: 12,
		},
		staff_id: {
			type: ObjectId,
			ref: "Staff",
			required: true,
		},
		work_day_id: {
			type: ObjectId,
			ref: "WorkdayHistory",
			required: true,
			unique: true,
		},
		overtime: {
			type: Number,
			required: true,
			default: 0,
		},
		holiday: {
			type: Number,
			required: true,
			default: 0,
		},
		weekend: {
			type: Number,
			required: true,
			default: 0,
		},
		insurance: {
			type: Number,
			required: true,
			default: 0,
		},
		personal_income_tax: {
			type: Number,
			required: true,
			default: 0,
		},
		bonus: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Salary", SalarySchema);

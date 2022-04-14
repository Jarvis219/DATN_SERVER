import TreatmentDetail from "../models/treatmentDetail";
import _ from "lodash";

export const listTreatmentDetail = (req, res) => {
	TreatmentDetail.find()
		.populate([
			{ path: "treatment_id" },
			{ path: "customer_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		])
		.sort({
			updatedAt: -1,
		})
		.exec((err, data) => {
			if (err) {
				return res.status(500).json({ Error: err });
			}
			return res.status(200).json({ data });
		});
};

export const treatmentId = (req, res, next, id) => {
	TreatmentDetail.findById(id)
		.populate([
			{ path: "treatment_id" },
			{ path: "customer_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		])
		.exec((err, data) => {
			if (err) {
				return res.status(500).json({ Error: err });
			}
			req.treatmentDetail = data;
			next();
		});
};

export const readTreatment = (req, res) => {
	return res.json(req.treatmentDetail);
};

export const removeTreatmentDetail = (req, res) => {
	let treatmentDetail = req.treatmentDetail;
	treatmentDetail.remove((err) => {
		if (err) {
			return res.status(400).json({
				error: "Delete treatment detail failure",
			});
		}
		res.json({
			message: "Delete treatment detail successfully",
		});
	});
};

export const createTreatmentDetail = async (req, res) => {
	const treatmentDetail = new TreatmentDetail(req.body);

	try {
		const curr = await treatmentDetail.save();
		const data = await curr.populate([
			{ path: "treatment_id" },
			{ path: "customer_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		]);
		res.json({
			data,
			message: "Create treatment detail successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error,
		});
	}
};

export const updateTreatmentDetail = async (req, res) => {
	let treatmentDetail = req.treatmentDetail;
	treatmentDetail = _.assignIn(treatmentDetail, req.body);
	try {
		const curr = await treatmentDetail.save();
		const data = await curr.populate([
			{ path: "treatment_id" },
			{ path: "customer_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		]);
		res.json({
			data,
			message: "Update treatment detail successfully",
		});
	} catch (error) {
		return res.status(400).json({
			error,
		});
	}
};

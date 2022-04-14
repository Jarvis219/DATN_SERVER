import Treatment from "../models/treatmentModel";
import TreatmentDetail from "../models/treatmentDetail";
import ServiceTreatment from "../models/serviceTreatmentModel";
import _ from "lodash";

export const listTreatment = (req, res) => {
	Treatment.find()
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
	Treatment.findById(id).exec((err, data) => {
		if (err) {
			return res.status(500).json({ Error: err });
		}
		req.treatment = data;
		next();
	});
};

export const readTreatment = (req, res) => {
	return res.json(req.treatment);
};

const invalidTreatment = async (_id) => {
	const ObjectId = require("mongodb").ObjectId;
	const id = new ObjectId(_id);

	try {
		const curr1 = await TreatmentDetail.findOne({ treatment_id: id });
		const curr2 = await ServiceTreatment.findOne({ treatment_id: id });
		if (curr1 || curr2) {
			return false;
		}
		return true;
	} catch (error) {
		return true;
	}
};

export const removeTreatment = async (req, res) => {
	let treatment = req.treatment;
	const check = await invalidTreatment(treatment._id);
	if (!check) {
		return res.status(400).json({
			error: "Vui lòng xóa những trường liên quan",
		});
	}

	treatment.remove((err) => {
		if (err) {
			return res.status(400).json({
				error: "Delete treatment failure",
			});
		}
		res.json({
			message: "Delete treatment successfully",
		});
	});
};

export const createTreatment = (req, res, next) => {
	const treatment = new Treatment(req.body);

	if (!req.body.service_id) {
		return res.status(400).json({
			error: "service id invalid!",
		});
	}
	treatment.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}

		req.newTreatment = {
			service_id: req.body.service_id,
			treatment_id: data._id,
		};
		next();
	});
};

export const updateTreatment = async (req, res, next) => {
	let treatment = req.treatment;
	treatment = _.assignIn(treatment, req.body);

	try {
		const data = await treatment.save();
		req.newTreatment = { data, service_id: req.body.service_id };
		next();
	} catch (error) {
		return res.status(400).json({
			error,
		});
	}
};

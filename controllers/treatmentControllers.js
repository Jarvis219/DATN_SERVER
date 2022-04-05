import Treatment from "../models/treatmentModel";
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

export const removeTreatment = (req, res) => {
	let treatment = req.treatment;
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

export const updateTreatment = (req, res, next) => {
	let treatment = req.treatment;
	treatment = _.assignIn(treatment, req.body);

	treatment.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: err,
			});
		}
		res.json({
			data,
			message: "Update treatment successfully",
		});
	});
};

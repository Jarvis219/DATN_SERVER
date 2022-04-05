import ServiceTreatment from "../models/serviceTreatmentModel";
import _ from "lodash";

export const listServiceTreatment = (req, res) => {
	ServiceTreatment.find()
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

export const servicetreatmentId = (req, res, next, id) => {
	ServiceTreatment.findById(id).exec((err, data) => {
		if (err) {
			return res.status(500).json({ Error: err });
		}
		req.servicetreatment = data;
		next();
	});
};

export const readServiceTreatment = (req, res) => {
	return res.json(req.Servicetreatment);
};

export const removeServiceTreatment = (req, res) => {
	let Servicetreatment = req.Servicetreatment;
	Servicetreatment.remove((err) => {
		if (err) {
			return res.status(400).json({
				error: "Delete service treatment failure",
			});
		}
		res.json({
			message: "Delete service treatment successfully",
		});
	});
};

export const createServiceTreatment = async (req, res) => {
	const servicetreatment = new ServiceTreatment(req.newTreatment);
	try {
		const data = await servicetreatment.save();
		res.json({
			data,
			message: "Create service treatment successfully",
		});
	} catch (error) {
		return res.status(400).json({
			error,
		});
	}
};

export const updateServiceTreatment = async (req, res) => {
	let treatment = req.servicetreatment;
	treatment = _.assignIn(treatment, req.body);
	const check = await checkData(treatment);
	if (check) {
		return res.status(400).json({
			error: "invalid",
		});
	}
	try {
		const data = await treatment.save();
		res.json({
			data,
			message: "Update succsessfully",
		});
	} catch (error) {
		return res.status(400).json({
			error,
		});
	}
};

const checkData = async (data) => {
	const treatmentId = data.treatment_id;
	const serviceId = data.service_id;
	const checkData = await ServiceTreatment.find({
		$and: [{ treatment_id: treatmentId }, { service_id: serviceId }],
	});
	if (checkData.length === 0) {
		return false;
	}
	return true;
};

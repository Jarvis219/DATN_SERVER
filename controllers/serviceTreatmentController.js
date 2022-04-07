import ServiceTreatment from "../models/serviceTreatmentModel";
import _ from "lodash";

export const listServiceTreatment = (req, res) => {
	ServiceTreatment.find()
		.sort({
			updatedAt: -1,
		})
		.populate("service_id treatment_id")
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
		const response = await servicetreatment.save();
		const data = await response.populate("service_id treatment_id");

		res.json({
			data,
			message: "Create service treatment successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error,
		});
	}
};

export const updateServiceTreatment = async (req, res) => {
	let treatment = req.newTreatment;
	treatment = {
		treatment_id: treatment.data._id,
		service_id: treatment.service_id,
	};

	const respon = await ServiceTreatment.find({
		treatment_id: treatment.treatment_id,
	});

	treatment = _.assignIn(respon[0], treatment);

	try {
		const result = await treatment.save();
		const data = await result.populate("service_id treatment_id");

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

import Salary from "../models/salaryModel";
import _ from "lodash";

export const listSalary = (req, res) => {
	Salary.find()
		.sort({
			updatedAt: -1,
		})
		.populate([
			{ path: "work_day_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		])
		.exec((err, data) => {
			if (err) {
				return res.status(500).json({ Error: err });
			}
			return res.status(200).json({ data });
		});
};

export const salaryId = (req, res, next, id) => {
	Salary.findById(id)
		.populate([
			{ path: "work_day_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		])
		.exec((err, data) => {
			if (err) {
				return res.status(500).json({ Error: err });
			}
			req.salary = data;
			next();
		});
};

export const readSalary = (req, res) => {
	return res.json(req.salary);
};

export const removeSalary = (req, res) => {
	let salary = req.salary;
	salary.remove((err) => {
		if (err) {
			return res.status(400).json({
				error: "Delete salary failure",
			});
		}
		res.json({
			message: "Delete salary successfully",
		});
	});
};

export const createSalary = async (req, res) => {
	try {
		const salary = new Salary(req.body);
		const curr = await salary.save();
		const data = await curr.populate([
			{ path: "work_day_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		]);
		res.json({
			data,
			message: "Create salary successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error,
		});
	}
};

export const updateSalary = async (req, res) => {
	let salary = req.salary;
	salary = _.assignIn(salary, req.body);

	try {
		const curr = await salary.save();
		const data = await curr.populate([
			{ path: "work_day_id" },
			{ path: "staff_id", populate: { path: "user_id" } },
		]);
		res.json({
			data,
			message: "Update salary successfully",
		});
	} catch (error) {
		return res.status(400).json({
			error,
		});
	}
};

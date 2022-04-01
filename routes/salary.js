import express from "express";
import {
	listSalary,
	salaryId,
	readSalary,
	removeSalary,
	updateSalary,
	createSalary,
	searchSalary,
	filterStaff,
} from "../controllers/salaryControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/filter-staff", filterStaff);
router.get("/search-salary", searchSalary);
router.get("/list-salary", listSalary);
router.get("/read-salary/:id", readSalary);
router.post(
	"/create-salary",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createSalary
);
router.put(
	"/update-salary/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateSalary
);
router.delete(
	"/remove-salary/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeSalary
);

router.param("id", salaryId);

module.exports = router;

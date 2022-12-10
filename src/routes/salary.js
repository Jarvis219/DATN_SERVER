import express from "express";
import {
	listSalary,
	salaryId,
	readSalary,
	removeSalary,
	updateSalary,
	createSalary,
} from "../controllers/salaryControllers";
import { authToken, requireSignin, isAuth, isAdmin } from "../middleware/token";

const router = express.Router();

router.get("/list-salary", listSalary);
router.get("/read-salary/:id", readSalary);
router.post(
	"/create-salary",
	authToken,
	requireSignin,
	isAuth,
	isAdmin,
	createSalary
);
router.put(
	"/update-salary/:id",
	authToken,
	requireSignin,
	isAuth,
	isAdmin,
	updateSalary
);
router.delete(
	"/remove-salary/:id",
	authToken,
	requireSignin,
	isAuth,
	isAdmin,
	removeSalary
);

router.param("id", salaryId);

module.exports = router;

import express from "express";
import {
	listEmployeeJobDetail,
	employeeJobDetailId,
	readEmployeeJobDetail,
	removeEmployeeJobDetail,
	updateEmployeeJobDetail,
	findStaffToId,
	updateSchedule,
	findStaff,
	createEmployeeJobDetail,
} from "../controllers/employeeJobDetailControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/find-staff-to-id", findStaff);
router.get("/list/employee/job/detail", listEmployeeJobDetail);
router.get("/read/employee/job/detail/:id", readEmployeeJobDetail);
router.put(
	"/update/employee/job/detail/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateEmployeeJobDetail
);
router.delete(
	"/remove/employee/job/detail/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateEmployeeJobDetail,
	removeEmployeeJobDetail
);
router.put("/update/schedule", findStaffToId, updateSchedule);
router.post(
	"/create/employee/job/detail",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateEmployeeJobDetail,
	createEmployeeJobDetail
);

router.param("id", employeeJobDetailId);

module.exports = router;

import express from "express";
import {
	listStaff,
	staffId,
	readStaff,
	removeStaff,
	updateStaff,
	createStaff,
	searchStaff,
	findStaff,
	createEmployeeJobDetail,
	updateEmployeeJobDetail,
	findStaffInJob,
} from "../controllers/staffControllers";

const router = express.Router();

router.get("/find-staff", findStaff);
router.get("/search-staff", searchStaff);
router.get("/list-staff", listStaff);
router.get("/read-staff", readStaff);
router.post("/create-staff", createStaff, createEmployeeJobDetail);

// cật nhật nhân viên vào dịch vụ nhất định
// ví dụ chuyển từ dịch vụ A->B thì cập nhật lại nhân viên vào dịch vụ B
// tham số truyền vào là id của nhân viên và id của dịch vụ
router.put(
	"/update-staff/:id",
	updateStaff,
	findStaffInJob,
	updateEmployeeJobDetail
);
router.delete("/remove-staff/:id", removeStaff);

router.param("id", staffId);

module.exports = router;

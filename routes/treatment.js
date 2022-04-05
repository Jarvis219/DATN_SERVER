import express from "express";
import {
	listTreatment,
	treatmentId,
	readTreatment,
	removeTreatment,
	updateTreatment,
	createTreatment,
} from "../controllers/treatmentControllers";
import {
	createServiceTreatment,
	updateServiceTreatment,
	servicetreatmentId,
} from "../controllers/serviceTreatmentController";

import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-treatment", listTreatment);
router.get("/read-treatment/:id", readTreatment);

// tạo treatment bao gồm cả service_id để tạo thêm bản ghi ở bảng service_treatment
router.post(
	"/create-treatment",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createTreatment,
	createServiceTreatment
);
router.put(
	"/update-treatment/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateTreatment
);
router.delete(
	"/remove-treatment/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeTreatment
);

// sửa chi tiết của bảng service treatment bao gồm có thể sửa service id và treatment id
// sẽ check nếu service id và treatment id của 1 bản ghi cùng tồn tại thì sẽ báo lỗi
router.put("/update/treatment/detail/:detailID", updateServiceTreatment);

router.param("detailID", servicetreatmentId);
router.param("id", treatmentId);

module.exports = router;

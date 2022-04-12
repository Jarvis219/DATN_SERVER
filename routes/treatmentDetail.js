import express from "express";
import {
	listTreatmentDetail,
	treatmentId,
	removeTreatmentDetail,
	updateTreatmentDetail,
	createTreatmentDetail,
} from "../controllers/treatmentDetailControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list/treatment/detail", listTreatmentDetail);
router.post(
	"/create/treatment/detail",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createTreatmentDetail
);
router.put(
	"/update/treatment/detail/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateTreatmentDetail
);
router.delete(
	"/remove/treatment/detail/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeTreatmentDetail
);

router.param("id", treatmentId);

module.exports = router;

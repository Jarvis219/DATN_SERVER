import express from "express";
import {
	listService,
	serviceId,
	readService,
	removeServices,
	createService,
	updateService,
	listServiceRelated,
	listSearch,
	filterCategory,
} from "../controllers/serviceControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-search/service", listSearch);
router.get("/filter-category-service", filterCategory);
router.get("/list-service", listService);
router.get("/list-related/service", listServiceRelated);
router.get("/read-service/:id", serviceId, readService);
router.post(
	"/create-service",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createService
);
router.put(
	"/update-service/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateService
);
router.delete(
	"/remove-service/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeServices
);

router.param("id", serviceId);

module.exports = router;

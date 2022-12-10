import express from "express";
import {
	listCustomer,
	customerId,
	readCustomer,
	removeCustomer,
	updateCustomer,
	createCustomer,
	filterCustomerPhone,
} from "../controllers/customerControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/find-customer", filterCustomerPhone);
router.get("/list-customer", listCustomer);
router.get("/read-customer/:id", readCustomer);
router.post("/create-customer", createCustomer);
router.put("/update-customer/:id", updateCustomer);
router.delete(
	"/remove-customer/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeCustomer
);

router.param("id", customerId);

module.exports = router;

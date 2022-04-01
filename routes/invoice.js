import express from "express";
import {
	listInvoice,
	invoiceId,
	readInvoice,
	removeInvoice,
	updateInvoice,
	createInvoice,
} from "../controllers/invoiceControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-invoice", listInvoice);
router.get("/read-invoice/:id", readInvoice);
router.post(
	"/create-invoice",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createInvoice
);
router.put(
	"/update-invoice/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateInvoice
);
router.delete(
	"/remove-invoice/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeInvoice
);

router.param("id", invoiceId);

module.exports = router;

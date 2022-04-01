import express from "express";
import {
	listDetailInvoice,
	detailInvoiceId,
	readDetailInvoice,
	removeDetailInvoice,
	updateDetailInvoice,
	createDetailInvoice,
} from "../controllers/detailInvoiceControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list/detail/invoice", listDetailInvoice);
router.get("/read/detail/invoice/:id", readDetailInvoice);
router.post("/create/detail/invoice", createDetailInvoice);
router.put("/update/detail/invoice/:id", updateDetailInvoice);
router.delete(
	"/remove/detail/invoice/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeDetailInvoice
);

router.param("id", detailInvoiceId);

module.exports = router;

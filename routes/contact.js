import express from "express";
import {
	listContact,
	createContact,
	contactId,
	readContact,
	removeContact,
	updateContact,
} from "../controllers/contactController";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-contact", listContact);

router.get("/read-contact/:id", readContact);

router.post("/create-contact", createContact);

router.put(
	"/update-contact/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateContact
);

router.delete(
	"/remove-contact/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeContact
);

router.param("id", contactId);

module.exports = router;

import express from "express";
import {
	listUser,
	userId,
	readUser,
	removeUser,
	updateUser,
	searchUser,
	createUser,
} from "../controllers/userControllers";
import { authToken, requireSignin, isAuth, isAdmin } from "../middleware/token";

const router = express.Router();

router.get("/search-user", searchUser);
router.get("/list-user", listUser);
router.get("/read-user/:id", userId, readUser);
router.post("/create-user", createUser);
router.put("/update-user/:id", updateUser);
router.delete(
	"/remove-user/:id",
	authToken,
	requireSignin,
	isAuth,
	isAdmin,
	removeUser
);

router.param("id", userId);

module.exports = router;

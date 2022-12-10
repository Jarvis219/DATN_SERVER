import express from "express";
import {
	listBlogs,
	createBlog,
	blogId,
	removeBlog,
	updateBlog,
} from "../controllers/blogControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-blog", listBlogs);
router.post(
	"/create-blog",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createBlog
);
router.put(
	"/update-blog/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateBlog
);
router.delete(
	"/remove-blog/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeBlog
);

router.param("id", blogId);

module.exports = router;

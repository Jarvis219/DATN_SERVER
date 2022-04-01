import express from "express";
import {
	listCategories,
	createCategory,
	categoryId,
	readCategory,
	removeCategory,
	updateCategory,
	listCategoriesRelated,
} from "../controllers/categoryControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";
const router = express.Router();

//Danh sách danh mục
router.get("/list-category", listCategories);

//Chi tiết danh mục
router.get("/read-category/:id", readCategory);

//Thêm mới danh mục
router.post(
	"/create-category",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createCategory
);

//Cập nhật danh mục
router.put(
	"/update-category/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateCategory
);

//Xoá danh mục
router.delete(
	"/remove-category/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeCategory
);

//List Danh mục( ngoại trừ Danh mục hiện tại)
router.get("/list-category/related/:id", listCategoriesRelated);

//Lấy param
router.param("id", categoryId);

module.exports = router;

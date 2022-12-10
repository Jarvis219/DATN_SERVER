import express from "express";
import {
	listBrands,
	createBrand,
	brandId,
	readBrand,
	removeBrand,
	updateBrand,
	listBrandsRelated,
} from "../controllers/brandControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

//Danh sách danh mục
router.get("/list-brand", listBrands);

//Chi tiết danh mục
router.get("/read-brand/:id", readBrand);

//Thêm mới danh mục
router.post(
	"/create-brand",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createBrand
);

//Cập nhật danh mục
router.put(
	"/update-brand/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateBrand
);

//Xoá danh mục
router.delete(
	"/remove-brand/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeBrand
);

//List Danh mục( ngoại trừ Danh mục hiện tại)
router.get("/list-brand/related/:id", listBrandsRelated);

//Lấy param
router.param("id", brandId);

module.exports = router;

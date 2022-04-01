import express from "express";
import {
	listProduct,
	createProduct,
	productId,
	readProduct,
	removeProduct,
	updateProduct,
	listProductRelated,
	listSearch,
	filter_category_brand,
} from "../controllers/productControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

router.get("/list-search/product", listSearch);
router.get("/filter-category-product", filter_category_brand);
router.get("/list-product", listProduct);
router.get("/list-related/product/:id", listProductRelated);
router.get("/read-product/:id", readProduct);
router.post(
	"/create-product",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	createProduct
);
router.put(
	"/update-product/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	updateProduct
);
router.delete(
	"/remove-product/:id",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	removeProduct
);

router.param("id", productId);

module.exports = router;

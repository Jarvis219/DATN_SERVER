import express from "express";
import {
	list,
	create,
	orderById,
	read,
	remove,
	update,
	orderByUser,
} from "../controllers/orderControllers";
import { userId } from "../controllers/userControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

//Danh sách đơn hàng
router.get("/list-order", list);
//Danh sách đơn hàng theo user
router.get("/list-order/:userId", orderByUser);
//Thêm đơn hàng
router.post("/create-order", create);
//Chi tiêt đơn hàng
router.get("/read-order/:orderId", read);
//Xoá đơn hàng
router.delete(
	"/remove-order/:orderId",
	authToken,
	requireSignin,
	isAuth,
	isStaff,
	remove
);
//Cập nhật trạng thái đơn hàng
router.put("/update-order/:orderId", update);
//Lấy param
router.param("orderId", orderById);
router.param("userId", userId);

module.exports = router;

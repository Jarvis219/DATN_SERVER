import express from "express";
import {
  listEvaluates,
  createEvaluate,
  evaluateId,
  readEvaluate,
  removeEvaluate,
  updateEvaluate,
  listEvaluateByProduct,
} from "../controllers/evaluateControllers";
import { productId } from "../controllers/productControllers";
import { authToken, requireSignin, isAuth, isStaff } from "../middleware/token";

const router = express.Router();

//Danh sách đánh giá
router.get("/list-evaluate", listEvaluates);

//Danh sách đánh giá theo sản phẩm
router.get("/list-evaluate/:productId", listEvaluateByProduct);

//Tạo mới đánh giá
router.post("/create-evaluate", createEvaluate);

//Chi tiêt đánh giá
router.get("/read-evaluate/:evaluateId", readEvaluate);

//Xoá đánh giá
router.delete(
  "/remove-evaluate/:evaluateId",
  authToken,
  requireSignin,
  isAuth,
  removeEvaluate
);
//Cập nhật đánh giá
router.put("/update-evaluate/:evaluateId", updateEvaluate);

//Lấy param
router.param("evaluateId", evaluateId); //id đánh giá
router.param("productId", productId); //id sản phẩm

module.exports = router;

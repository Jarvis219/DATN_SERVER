import express from "express";
import {
	addCart,
	listCart,
	listCartUser,
	cartByID,
	removeCart,
	readCart,
	updateCart,
	removeAllItem,
} from "../controllers/cartControllers";
import { userID } from "../controllers/userControllers";

const router = express.Router();

router.get("/list-cart", listCart);
router.get("/list-cart/user", listCartUser);
router.get("/read-cart/:id", readCart);
router.post("/create-cart", addCart);
router.put("/update-cart/:id", updateCart);
router.delete("/remove-cart/:id", removeCart);
router.put("/remove-all-item/:id", removeAllItem);

router.param("id", cartByID);
// router.param("userId", userID);
module.exports = router;

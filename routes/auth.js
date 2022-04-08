import express from "express";
import { Login } from "../controllers/authControllers";
import { refreshToken } from "../middleware/token";

const router = express.Router();

router.post("/login", Login);
router.post("/auth/refreshtoken", refreshToken);

module.exports = router;

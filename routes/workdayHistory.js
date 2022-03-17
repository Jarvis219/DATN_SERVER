import express from "express";
import {
  listWorkdayHistory,
  workdayHistoryId,
  readWorkdayHistory,
  removeWorkdayHistory,
  updateWorkdayHistory,
  createWorkdayHistory,
} from "../controllers/workdayHistoryControllers";

const router = express.Router();

router.get("/list/workday/history", listWorkdayHistory);
router.get("/read/workday/history/:id", readWorkdayHistory);
router.post("/create/workday/history", createWorkdayHistory);
router.put("/update/workday/history/:id", updateWorkdayHistory);
router.delete("/remove/workday/history/:id", removeWorkdayHistory);

router.param("id", workdayHistoryId);

module.exports = router;

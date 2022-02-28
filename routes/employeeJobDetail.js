import express from "express";
import {
  listEmployeeJobDetail,
  employeeJobDetailId,
  readEmployeeJobDetail,
  removeEmployeeJobDetail,
  updateEmployeeJobDetail,
  createEmployeeJobDetail,
  findStaffToId,
  updateSchedule,
} from "../controllers/employeeJobDetailControllers";

const router = express.Router();

router.get("/list/employee/job/detail", listEmployeeJobDetail);
router.get("/read/employee/job/detail/:id", readEmployeeJobDetail);
router.post("/create/employee/job/detail", createEmployeeJobDetail);
router.put("/update/employee/job/detail/:id", updateEmployeeJobDetail);
router.delete("/remove/employee/job/detail/:id", removeEmployeeJobDetail);
router.put("/update/schedule", findStaffToId, updateSchedule);

router.param("id", employeeJobDetailId);

module.exports = router;

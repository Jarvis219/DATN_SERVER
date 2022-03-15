import express from "express";
import {
  listStaff,
  staffId,
  readStaff,
  removeStaff,
  updateStaff,
  createStaff,
  searchStaff,
  findStaff,
  createEmployeeJobDetail,
} from "../controllers/staffControllers";

const router = express.Router();

router.get("/find-staff", findStaff);
router.get("/search-staff", searchStaff);
router.get("/list-staff", listStaff);
router.get("/read-staff", readStaff);
router.post("/create-staff", createStaff, createEmployeeJobDetail);
router.put("/update-staff/:id", updateStaff);
router.delete("/remove-staff/:id", removeStaff);

router.param("id", staffId);

module.exports = router;

import express from "express";
import {
  listContact,
  createContact,
  contactId,
  readContact,
  removeContact,
  updateContact,
} from "../controllers/contactController";

const router = express.Router();

router.get("/list-contact", listContact);

router.get("/read-contact/:id", readContact);

router.post("/create-contact", createContact);

router.put("/update-contact/:id", updateContact);

router.delete("/remove-contact/:id", removeContact);

router.param("id", contactId);

module.exports = router;

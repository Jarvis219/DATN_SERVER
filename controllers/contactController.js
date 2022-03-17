import Contact from "../models/contactModel";
import _ from "lodash";

export const listContact = (req, res) => {
  Contact.find().exec((err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Contact not found!",
      });
    }
    res.status(200).json({ data });
  });
};

export const createContact = (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Add Contact failed!",
      });
    }
    res.json({
      data,
      message: "Create Contact successfully",
    });
  });
};

export const contactId = (req, res, next, id) => {
  Contact.findById(id).exec((err, data) => {
    if (err) {
      return res.status(404).json({
        error: "Contact not found!",
      });
    }
    req.contact = data;
    next();
  });
};

export const readContact = (req, res) => {
  return res.json(req.contact);
};

export const removeContact = (req, res) => {
  let contact = req.contact;
  contact.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete Contact failed!",
      });
    }
    res.json({
      message: "Delete Contact successfully",
      data,
    });
  });
};

export const updateContact = (req, res) => {
  let contact = req.contact;
  contact = _.assignIn(contact, req.body);
  contact.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update Contact failed!",
      });
    }
    res.json({
      message: "Update Contact successfully",
      data,
    });
  });
};

// routes/signatureRoutes.js
const express = require("express");
const router = express.Router();
const signatureController = require("../Controllers/signatureController");

router.post("/create_signature", signatureController.createSignature);
router.get("/get_signatures", signatureController.getSignatures);
router.get("/get_signature/:id", signatureController.getSignatureById);
router.get("/get_signatures_by_user_id/:id", signatureController.getSignatureByUserId);
router.put("/update_signature/:id", signatureController.updateSignature);
router.delete("/delete_signature/:id", signatureController.deleteSignature);

module.exports = router;

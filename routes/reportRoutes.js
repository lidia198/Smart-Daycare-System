const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    verifyToken,
    authorize("admin", "caregiver"),
    reportController.createReport
);

module.exports = router;
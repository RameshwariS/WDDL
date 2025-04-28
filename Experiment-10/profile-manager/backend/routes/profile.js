const express = require("express");
const { getProfile, updateProfile, deleteProfile } = require("../controllers/profile");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, upload.single("profile_picture"), updateProfile);
router.delete("/", authMiddleware, deleteProfile);

module.exports = router;
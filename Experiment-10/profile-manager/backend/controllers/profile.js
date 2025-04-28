const db = require("../config/db");
const upload = require("../middleware/upload");

exports.getProfile = async (req, res) => {
  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile (with optional profile picture)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    let profilePicture = req.file ? req.file.path : null;

    // Update user data
    await db.query(
      "UPDATE users SET name = ?, email = ?, phone = ?, address = ?, profile_picture = COALESCE(?, profile_picture) WHERE id = ?",
      [name, email, phone, address, profilePicture, req.user.id]
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.user.id]);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
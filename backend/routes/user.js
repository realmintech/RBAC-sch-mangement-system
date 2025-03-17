const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/admin", authenticateUser, authorizeRoles("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

router.get(
  "/teacher",
  authenticateUser,
  authorizeRoles("teacher", "admin"),
  (req, res) => {
    res.json({ msg: "Welcome Teacher" });
  }
);

router.get(
  "/student",
  authenticateUser,
  authorizeRoles("student", "parent", "admin"),
  (req, res) => {
    res.json({ msg: "Welcome Student/Parent" });
  }
);

module.exports = router;

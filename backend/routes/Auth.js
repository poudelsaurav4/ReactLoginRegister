const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userModel = require("../models/User");
const gravatar = require("gravatar");
const { generateToken } = require("../utils/generateToken");
const { Auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.get("/", Auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error });
  }
});

//login Route
router.post(
  "/login",
  [
    check("email", "Please include valid email").isEmail(),
    check("password", "Please enter password.").exists(),
  ],
  async (req, res) => {
    //email password validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await userModel.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Email not found.Make sure you are registered." });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Password is incorrect" });
      }
      const token = generateToken(user);

      // res.cookie("x-auth-token",token);
      return res.status(200).json({ msg: "user is logged in", token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
module.exports = router;

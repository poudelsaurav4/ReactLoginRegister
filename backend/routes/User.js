const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userModel = require("../models/User");
const gravatar = require("gravatar");
const { generateToken } = require("../utils/generateToken");

//register Route
router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await userModel.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "Email is already taken." });
      }
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      user = new userModel({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });
      const doc = await user.save();
      const token = generateToken(doc);

      // res.cookie("x-auth-token",token);
      return res.status(200).json({ msg: "user is registered", token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const profileModel = require("../models/Profile");
const { Auth } = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const userModel = require("../models/User");

// @route  get api/profile/me
// @desc   view self profile
// @access private

router.get("/me", Auth, async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

// @route  get api/profile
// @desc   create or update profile
// @access private
router.post(
  "/",
  Auth,
  [
    check("status", "status is required").not().isEmpty(),
    check("skill", "skill is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        company,
        website,
        location,
        status,
        skill,
        bio,
        facebook,
        linkedin,
        instagram,
        twitter,
      } = req.body;

      const profileFields = {};

      //GET USER FIELDS
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (status) profileFields.status = status;
      if (bio) profileFields.bio = bio;
      if (skill) {
        profileFields.skill = skill.split(",").map((skill) => skill.trim());
        console.log(profileFields.skill);
      }

      //GET SOCIAL FIELDS
      if (facebook) profileFields.facebook = facebook;
      if (linkedin) profileFields.linkedin = linkedin;
      if (twitter) profileFields.twitter = twitter;
      if (instagram) profileFields.instagram = instagram;

      const profile = await profileModel.findOne({ user: req.user.id });
      if (profile) {
        //update
        console.log(profile);
        const updated = await profileModel.findByIdAndUpdate(
          profile._id,
          { $set: profileFields },
          { new: true }
        );

        return res
          .status(200)
          .json({ msg: "Profile Updated", updated: updated });
      }

      // else add new profile
      const newProfile = new profileModel(profileFields);
      await newProfile.save();
      return res
        .status(200)
        .json({ msg: "Profile added", profile: newProfile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
);

// @route  get api/profile
// @desc   get all profiles
// @access public

router.get("/", async (req, res) => {
  try {
    const profile = await profileModel
      .find()
      .populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({ msg: "Profile doesnot exist." });
    res.status(200).json({ msg: "Showing all profiles ", profile: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

//get profile by user ID
router.get("/user/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const profile = await profileModel
      .findOne({ user: userID })
      .populate("user", ["name", "avatar"]);
    return res.status(200).json({ user: profile });
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile doesnot exist." });
    }
    return res.status(500).json({ msg: "SERVER ERROR", error: error });
  }
});

// @route  DELETE api/profile
// @desc   delete profile,user and post
// @access private
//todo     delete post

router.delete("/", Auth, async (req, res) => {
  try {
    //remove profile
    const profile = await profileModel.findOneAndDelete({ user: req.user.id });
    //remove user
    await userModel.findByIdAndDelete(profile.user);
    const profiles = await profileModel.find().populate("user", ["name"]);

    res
      .status(200)
      .json({ msg: "Profile Deleted Sucessfully.", profiles: profiles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// @route  PUT api/profile/experience
// @desc   adding profile experience
// @access private

router.put(
  "/experience",
  [
    Auth,
    [
      check("company", "company is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, company, to, from, location, current, description } =
        req.body;
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };
      const profile = await profileModel.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      const newProfile = await profile.save();
      res.status(200).json({ msg: "experience added", profile: newProfile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// @route  PUT api/profile/experience/:exp_id:
// @desc   delete profile experience
// @access private

router.delete("/experience/:exp_id", Auth, async (req, res) => {
  try {
    const profile = await profileModel.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({ msg: "experience removed", profile: profile });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// @route  PUT api/profile/education
// @desc   adding profile education
// @access private

router.put(
  "/education",
  [
    Auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldOfStudy", "fieldOfStudy is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { school, degree, to, fieldOfStudy, from, location, current } =
        req.body;
      const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        location,
      };
      const profile = await profileModel.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      const newProfile = await profile.save();
      res.status(200).json({ msg: "education added", profile: newProfile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// @route  PUT api/profile/education/:edu_id:
// @desc   delete profile education
// @access private

router.delete("/education/:edu_id", Auth, async (req, res) => {
  try {
    const profile = await profileModel.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({ msg: "education removed", profile: profile });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;

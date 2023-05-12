const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  website: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skill: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },

  experience: [
    {
      title: {
        type: String,
        // required: true,
      },
      company: {
        type: String,
        // required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        // required: true,
      },
      degree: {
        type: String,
        // required: true,
      },
      fieldOfStudy: {
        type: String,
        // required: true,
      },
      from: {
        type: Date,
        // required: true,
      },
      to: {
        type: Date,
        // required: true,
      },
      current: {
        type: Boolean,
        // required: true,
      },
      loaction: {
        type: Boolean,
        // required: true,
      },
    },
  ],
  socials: {
    facebook: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkdin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const profileModel = mongoose.model("profile", profileSchema);

module.exports = profileModel;

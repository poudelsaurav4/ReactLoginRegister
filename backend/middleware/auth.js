const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token,authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;     
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token", error: error });
  }
};

module.exports = {
  Auth,
};

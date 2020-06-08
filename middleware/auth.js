const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Protect routes
exports.protect = async (req, res, next) => {
  try {
    console.log("===Protect Middleware====");

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    //   else if (req.cookies.token) {
    //     token = req.cookies.token;
    //   }

    //Make sure token exist
    if (!token) {
      res.status(401).json({
        status: false,
        message: "Not authorize to access this route",
      });
    }

    try {
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      res.status(401).json({
        status: false,
        message: "Catch block==Not authorize to access this route",
        Error: err,
      });
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      message: "Catch block==Not authorize to access this route",
      Error: err,
    });
  }
};

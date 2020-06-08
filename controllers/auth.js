const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    console.log("REGISTER==", req.body);
    const { name, email, password } = req.body;

    //Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log("ERROR", err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log("LOGIN==", req.body);

    const { email, password } = req.body;

    //Validate Email and Password
    if (!email || !password) {
      res.status(401).json({
        status: false,
        message: "Please Enter Email and Password",
      });
    }

    //Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        status: false,
        message: "Invalid email and password",
      });
    }

    //Check if password matchs
    const ismatch = await user.matchPassword(password);

    if (!ismatch) {
      res.status(401).json({
        status: false,
        message: "Invalid email and password",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: false,
      Error: err,
    });
  }
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

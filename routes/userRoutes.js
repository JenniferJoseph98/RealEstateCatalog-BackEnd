const { hashGenerate, hashValidator } = require("../bcrypt/hashing");
const { tokenGenerator, tokenValidator } = require("../bcrypt/token");
const User = require("../models/userSchema");
const authRoutes = require("express").Router();

authRoutes.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser != null || !existingUser) {
      const hashPass = await hashGenerate(req.body.password);
      const value = await User.find().sort({ _id: -1 }).limit(1);

      let userid;
      if (value.length != 0) {
        userid = parseInt(value[0].split("D")[1]) + 1;
        // console.log(userid);
      } else {
        userid = 1200;
        // console.log(userid);
      }
      let str = req.body.email.split("@")[0];
      var username = str.replace(/[^A-Z]+/gi, "");
      console.log(str, username);
      const user = await User.create({
        email: req.body.email,
        password: hashPass,
        userId: "06PPD" + userid,
        name: username + userid,
      });

      res.json({
        status: "success",
        message: "Registration succesful",
        user,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Email already Exist",
      });
    }
  } catch (error) {
    res.send("Unable to signup");
  }
});
authRoutes.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser === null || !existingUser) {
      res.status(400).json({
        status: "Failed",
        message: "User Not Found, Kindly signup ",
      });
    } else {
      let passCheck = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (passCheck) {
        let token = await tokenGenerator(req.body.email, process.env.JWT_KEY);
        res.status(200).json({
          status: "Success",
          token: token,
          name: existingUser.name,
          email: existingUser.email,
          userId: existingUser.userId,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Check your credentials",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Check your credentials",
    });
  }
});
module.exports = authRoutes;

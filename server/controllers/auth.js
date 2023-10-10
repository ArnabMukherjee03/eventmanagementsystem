const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const {
  validateRegisterInput,
  validatePassword,
} = require("../validation/register");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const data = await req.body;

    console.log(data);
    const { isValid, errors } = validateRegisterInput(data);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }


    const {email, password } = data;

    const isEmail = await User.findOne({ email });

    if (isEmail) {
      return res.status(400).json({ error: ["User with this email is exist"] });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).json({ error: ["Something Went Wrong..."] });
    }


    res.status(200).json({ message: "Signup Successfully" });
  } catch (error) {
    res.status(500).json({ error: [error.message] });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }

      if (info) {
        return res.status(401).json({ message: info });
      }

      // Assuming user.token is set in your authentication logic
      const token = user.token;

      // Store user.id in the session
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        });

       
        return res.status(200).json({ id:user.id, message: "Login Successful" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  })(req, res, next);
};

exports.checkAuth = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(400).json({ message: "Not Authorize User" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    res.status(201).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


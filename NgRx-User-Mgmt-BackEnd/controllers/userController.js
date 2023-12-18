const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateAndSetJwt } = require("../config/jwt");
require("dotenv").config();
// const upload = require("../config/multer");

module.exports = {
  //----------Load User Home-------------//
  loadUserHome: async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];
      const claims = jwt.verify(cookie, process.env.JWT_SECRET);
      if (!claims) {
        return res.status(401).send({ message: "Unauthenticated" });
      }
      const userData = await Users.findOne({ _id: claims._id });
      const { password, ...data } = userData.toJSON();
      res.send(data);
    } catch (error) {
      return res.status(401).send({ message: "Unauthenticated" });
    }
  },
  //----------Register User-------------//
  registerUser: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const salt = await bcrypt.genSalt(10);
      const [hashPass, isUserExist] = await Promise.all([bcrypt.hash(password, salt), Users.findOne({ email })]);
      if (isUserExist) {
        return res.status(400).send({
          message: "Email already exists",
        });
      } else {
        const user = await new Users({
          name,
          email,
          password: hashPass,
        }).save();

        const { _id } = user.toJSON();

        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }
        generateAndSetJwt(res, _id);
        res.send({
          message: "Success",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //----------Login User-------------//
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await Users.findOne({ email });
      if (!userData) {
        return res.status(404).send({ message: "User not found" });
      }
      if (!(await bcrypt.compare(password, userData.password))) {
        console.log("Password didnt match");
        return res.status(400).send({ message: "Password is Incorrect" });
      }

      generateAndSetJwt(res, userData._id);

      res.send({
        message: "Success",
      });
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  //----------Logout User------------//
  logout: async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "Logged Out" });
  },

  //----------ProfileImage update User------------//
  profileImage: async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];
      const claims = jwt.verify(cookie, process.env.JWT_SECRET);
      if (!claims) {
        if (!claims) return res.status(401).send({ message: "Unauthenticated" });
      }
      const updateImg = await Users.updateOne(
        { _id: claims._id },
        {
          $set: {
            image: req.file.filename,
          },
        }
      );

      if (!updateImg) return res.status(401).json({ message: "Something went wrong!" });
      return res.status(200).json({ message: "Image Uploaded Successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  //----------UserProfileLoad---------------------------//

  profile: async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];
      const claims = jwt.verify(cookie, process.env.JWT_SECRET);
      if (!claims) {
        if (!claims) return res.status(401).send({ message: "Unauthenticated" });
      }
      const userData = await Users.findById({ _id: claims._id });
      const { password, ...data } = userData.toJSON();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  },
};

const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateAndSetJwt } = require("../config/jwt");
require("dotenv").config();

module.exports = {
  //----------Admin Login-------------//
  loginAdmin: async (req, res) => {
    try {
      console.log("login body", req.body);
      const adminData = await Users.findOne({ email: req.body.email, isAdmin: true });
      if (!adminData) {
        console.log("This admin email not exist");
        return res.status(400).send({ message: "This admin not exist" });
      }

      if (!(await bcrypt.compare(req.body.password, adminData.password))) {
        console.log("Password is Incorrect");
        return res.status(400).send({
          message: "Password is Incorrect",
        });
      }
      generateAndSetJwt(res, adminData._id);
      res.send({ message: "Success" });
    } catch (error) {
      console.log(error);
    }
  },
  //----------Admin Logout-------------//
  logout: async (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.send({ message: "Logout Success" });
    } catch (error) {
      console.log(error);
    }
  },
  //----------Admin Active-------------//

  
  isActive: async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];
      console.log("cookie",cookie)
      const claims = jwt.verify(cookie, process.env.JWT_SECRET);
      console.log("claims",claims);
      if (!claims) {
        console.log("claims issue");
        return res.status(401).send({ message: "Unautherized :(" });
      }
      const user = await Users.findOne({ _id: claims._id, isAdmin: true });
      const { password, ...data } = user.toJSON();
      res.send(data);
    } catch (error) {
      console.log("hello",error);
      return res.status(401).send({ message: "unauthenticated" });
    }
  },

  //----------Admin Home-------------//
  loadHome: async (req, res) => {
    try {
      const cookie = req.cookies["jwt"];
      const claims = jwt.verify(cookie, process.env.JWT_SECRET);
      if (!claims) {
        return res.status(401).send({ message: "Unautherized :(" });
      }
      const userData = await Users.findOne({ _id: userData._id, isAdmin: true });
      const { password, ...data } = userData.toJSON();
      res.send(data);
    } catch (error) {
      return res.status(401).send({ message: "unauthenticated" });
    }
  },
  //----------Admin Users view------------//
  loadUsersList: async (req, res) => {
    try {
      const users = await Users.find();
      res.send(users);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
  //----------Admin delete user-------------//
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await Users.findByIdAndDelete({ _id: req.params.id });
      if (!deletedUser) return res.send({ message: "Something went wrong" });
      res.send(deletedUser);
    } catch (error) {
      console.log(error);
    }
  },
  //----------Admin user details--------------//
  userDetails: async (req, res) => {
    try {
      const userData = await Users.findById({ _id: req.params.id });
      if (!userData) return res.send({ message: "Something went wrong" });
      const { password, ...data } = userData.toJSON();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  },
  //----------Admin edit user-------------//
  editUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const userData = await Users.updateOne({ email }, { $set: { name } });
      if (!userData) return res.send({ message: "Something went wrong" });
      return res.send({ message: "Success" });
    } catch (error) {
      console.log(error);
    }
  },
  //----------Admin create user-------------//
  createUser: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const isEmailExist = await Users.findOne({ email });
      if (isEmailExist) {
        return res.status(400).send({ message: "Email already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      await new Users({ name, email, password: hashPass }).save();
      res.send({ message: "Success" });
    } catch (error) {
      console.log(error);
    }
  },
};

const JWT = require("jsonwebtoken");


const generateAndSetJwt = (res, userId) => {
    console.log("working");
  const token = JWT.sign({ _id: userId }, process.env.JWT_SECRET);
  res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
}

module.exports = {generateAndSetJwt}
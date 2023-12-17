const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const nocache = require("nocache");
const { mongoConnect } = require("./config/config");
require("dotenv").config();

// ====================Express Instance Setup====================

const app = express();
mongoConnect();

// ====================Directory Path to Different Routes====================

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

// ====================Application-Level Middlewares====================

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// ====================Router-Level Middlewares====================

// app.use("/images", express.static(path.join(__dirname, "./images")));

// ====================ROUTES====================
app.use(userRouter);
// app.use(adminRouter);

app.listen(3000, () => console.log("Listening on port 3000"));

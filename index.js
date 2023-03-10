const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/userRoutes");
const User = require("./models/userSchema");
const mongoose = require("mongoose");
const propertyRoutes = require("./routes/propertyRoutes");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, () => console.log("Database Connected"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
const jwt = require("jsonwebtoken");
const { tokenValidator } = require("./bcrypt/token");
const searchRoutes = require("./routes/searchRoutes");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/users", authRoutes);
app.use("/api/property", tokenValidator, propertyRoutes);
app.use("/api/search", searchRoutes);
app.listen("8000", () => console.log("Server Connected at 8000"));

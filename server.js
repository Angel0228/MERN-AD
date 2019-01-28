const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Routes Define
const adverts = require("./routes/api/adverts");
const users = require("./routes/api/users");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/adverts", adverts);
app.use("/api/users", users);

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server running on port ${port}`));

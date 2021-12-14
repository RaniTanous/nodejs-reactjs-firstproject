const users = require("./routes/users");
const auth = require("./routes/auth");
const orders = require("./routes/orders");
const restaurants = require("./routes/restaurants");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://localhost/reactfinalproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/orders", orders);
app.use("/api/restaurants", restaurants);

const PORT = 3150;
http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

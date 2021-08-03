const config = require("config");
const products = require("./routes/products");
const auth = require("./routes/auth");
const addresses = require("./routes/addresses");
const orders = require("./routes/orders");
const users = require("./routes/users");

const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1); // 0 means success anything else means failure, so if jwtPrivateKey is not set we get error and process exit.
}



mongoose
  .connect("mongodb://localhost/upGrad_Eshop_application")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.error("Couldnot connected to database"));

 const express = require("express");
 const app = express();
app.use(express.json());
app.use("/products", products);
app.use("/addresses", addresses);
app.use("/orders", orders);
app.use("/users", users);
app.use("/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
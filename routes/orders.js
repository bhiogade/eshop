const auth = require("../middleware/auth"); 
const { Order, validateOrder } = require("../models/order");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const express = require("express");
const router = express.Router();

router.post("/",auth, async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let order = new Order({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    manufacturer: req.body.manufacturer,
    availableItems: req.body.availableItems,
    imageURL: req.body.imageURL,
  });

  order = await order.save();
  res.send(order);
});

module.exports = router;

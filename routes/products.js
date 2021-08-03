const {Product,validateProduct} = require('../models/product');
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });

  router.get("/categories", async (req, res) => {
    const products = await Product.find().select("category").select("-_id");
    res.send(products);
  });

  router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).send("The product with the given ID was not found.");
    res.send(product);
  });

  router.post("/", async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      availableItems: req.body.availableItems,
      imageURL: req.body.imageURL,
    });

    product = await product.save();
    res.send(product);
  });

  router.put("/:id", async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        availableItems: req.body.availableItems,
        imageURL: req.body.imageURL,
      },
      { new: true }
    );
    if (!product)
      return res.status(404).send("The product with the given id not found");
    res.send(product);
  });

  router.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product)
      return res.status(404).send("The product with the given ID was not found.");
    res.send(product);
  });

  module.exports = router;

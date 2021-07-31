const mongoose = require("mongoose");
const Joi = require("joi");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const express = require("express");
const app = express();
app.use(express.json());


mongoose
  .connect("mongodb://localhost/upGrad_Eshop_application")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.error("Couldnot connected to database"));

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  manufacturer: String,
  availableItems: Number,
  price: Number,
  imageURL: {
    type: String,
    // default:
    //   "https://www.reliancedigital.in/medias/Apple-12-Smartphones-491901533-i...",
  },
  description: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/products/categories", async (req, res) => {
  const products = await Product.find().select("category").select("-_id");
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  res.send(product);
});

app.post("/products", async (req, res) => {
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

app.put("/products/:id", async (req, res) => {
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

app.delete("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  res.send(product);
});

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(3).required(),
    availableItems: Joi.number().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    imageURL: Joi.string().min(3).required(),
    manufacturer: Joi.string().min(3).required(),
  };
  return Joi.validate(product, schema); // change the type
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
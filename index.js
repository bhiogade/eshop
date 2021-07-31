const mongoose = require("mongoose");
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
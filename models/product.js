const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

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

exports.productSchema = productSchema;
exports.Product = Product; 
exports.validateProduct = validateProduct;
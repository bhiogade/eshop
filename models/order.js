const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const orderSchema = new mongoose.Schema({
    name: String,
    category: String,
    manufacturer: String,
    availableItems: Number,
    price: Number,
  });

  const Order = mongoose.model("Order", orderSchema);


  function validateOrder(order) {
    const schema = {
      name: Joi.string().min(3).required(),
      availableItems: Joi.number().required(),
      price: Joi.number().positive().required(),
      category: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      imageURL: Joi.string().min(3).required(),
      manufacturer: Joi.string().min(3).required(),
    };
    return Joi.validate(order, schema); // change the type
  }

exports.orderSchema = orderSchema;
exports.Order = Order; 
exports.validateOrder = validateOrder;
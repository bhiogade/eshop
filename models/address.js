const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const addressSchema = new mongoose.Schema({
    name: String,
    city: String,
    state: String,
    street: String,
    contactNumber: Number,
    landmark: String,   // optional
    zipCode: String,
  });

  const Address = mongoose.model("Address", addressSchema);


  function validateAddress(address) {
    const schema = {
      name: Joi.string().min(3).required(),
      city: Joi.string().min(3).required(),
      state: Joi.string().min(3).required(),
      street: Joi.string().min(3).required(),
      contactNumber: Joi.number().required(),  
      landmark: Joi.string().min(3),
      zipCode: Joi.string().min(3).required(),
    };
    return Joi.validate(address, schema); // change the type
  }

exports.addressSchema = addressSchema;
exports.Address = Address; 
exports.validateAddress = validateAddress;
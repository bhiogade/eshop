onst Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    contactNumber: Number,
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    contactNumber: Joi.number().required(),
  };

  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
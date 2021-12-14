const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const { object } = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  role: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  orders: Array,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      biz: this.biz,
    },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUsered(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email().label("Email"),
    address: Joi.string().min(2).max(400).required(),
    role: Joi.string().min(2).max(400).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
    isActive: Joi.boolean().required().allow(),
  });

  return schema.validate(user);
}

function validateUpdate(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email().label("Email"),
    address: Joi.string().min(2).max(400).required(),
    role: Joi.string().min(2).max(400).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
  });

  return schema.validate(user);
}
function validateOrders(data) {
  const schema = Joi.object({
    orders: Joi.array().min(1).required(),
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validateUsered;
exports.validateUpdate = validateUpdate;

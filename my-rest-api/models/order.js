const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const orderSchema = new mongoose.Schema({
  orderIncludes: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  orderAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  orderOwnerPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  orderNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },

  user: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  restaurant: {
    selectedRest: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    name: {
      type: String,
      required: true,
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    orderIncludes: Joi.string().min(2).max(1024).required(),
    orderAddress: Joi.string().min(2).max(400).required(),
    orderOwnerPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    selectedRest: Joi.string().min(2).max(400).required(),
    user: Joi.object({
      name: Joi.string().required(),
    }),
    isActive: Joi.boolean().required(),
  });

  return schema.validate(order);
}

async function generateOrderNumber(Order) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let order = await Order.findOne({ orderNumber: randomNumber });
    if (!order) return String(randomNumber);
  }
}

exports.Order = Order;
exports.validateOrder = validateOrder;
exports.generateOrderNumber = generateOrderNumber;

const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const restaurantSchema = new mongoose.Schema({
  resName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  resDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  resAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  resPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  resImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  resOpenHours: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  resNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  id_: { type: mongoose.Schema.Types.ObjectId },
});

const Restaurants = mongoose.model("Restaurant", restaurantSchema);

function validateRestaurant(restaurant) {
  const schema = Joi.object({
    resName: Joi.string().min(2).max(255).required(),
    resDescription: Joi.string().min(2).max(1024).required(),
    resAddress: Joi.string().min(2).max(400).required(),
    resPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    resImage: Joi.string().min(11).max(1024),
    resOpenHours: Joi.string().min(3).max(1024),
    resNumber: Joi.string().min(3).max(99999999999),
  });

  return schema.validate(restaurant);
}

async function generaterRestaurantNumber(Restaurant) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let restaurant = await Restaurant.findOne({ resNumber: randomNumber });
    if (!restaurant) return String(randomNumber);
  }
}

module.exports = { Restaurants, validateRestaurant, generaterRestaurantNumber };

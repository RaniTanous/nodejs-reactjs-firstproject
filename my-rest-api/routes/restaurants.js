const express = require("express");
const _ = require("lodash");
const {
  Restaurants,
  validateRestaurant,
  generaterRestaurantNumber,
} = require("../models/restaurant");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/all", (req, res) => {
  Restaurants.find().exec((err, restaurants) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(restaurants);
  });
});
router.delete("/delete/:id", auth, async (req, res) => {
  const restaurant = await Restaurants.findOneAndRemove({
    _id: req.params.id,
  });
  if (!restaurant)
    return res
      .status(404)
      .send("The restaurant with the given ID was not found.");
  res.send(restaurant);
});

router.put("/edit/:id", auth, async (req, res) => {
  const { error } = validateRestaurant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let restaurant = await Restaurants.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!restaurant)
    return res
      .status(404)
      .send("The restaurant with the given ID was not found.");

  restaurant = await Restaurants.findOne({
    _id: req.params.id,

  });
  res.send(restaurant);
});

router.get("/:id", auth, async (req, res) => {
  const restaurant = await Restaurants.findOne({
    _id: req.params.id,

  });
  if (!restaurant)
    return console.log(res.status(404).send("The restaurant with the given ID was not found."));
  res.send(restaurant);
});

router.post("/create", auth, async (req, res) => {
  const { error } = validateRestaurant(req.body);
  if (error) return res.status(400).send(console.log(error.details[0].message));

  let restaurant = new Restaurants({
    resName: req.body.resName,
    resDescription: req.body.resDescription,
    resAddress: req.body.resAddress,
    resPhone: req.body.resPhone,
    resOpenHours: req.body.resOpenHours,
    resImage: req.body.resImage
      ? req.body.resImage
      : "https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_960_720.jpg",
    resNumber: await generaterRestaurantNumber(Restaurants),
  });

  post = await restaurant.save();
  res.send(post);
});

module.exports = router;

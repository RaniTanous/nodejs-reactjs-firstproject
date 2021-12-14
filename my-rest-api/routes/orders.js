const express = require("express");
const _ = require("lodash");
const {
  Order,
  validateOrder,
  generateOrderNumber,
} = require("../models/order");
const auth = require("../middleware/auth");
const router = express.Router();
const { User } = require("../models/user");
const { Restaurants } = require("../models/restaurant");
const { Query } = require("mongoose");

router.get("/all", (req, res) => {
  Order.find().exec((err, orders) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(orders);
  });
});

router.put("/complete/:id", auth, async (req, res) => {
  let order = await Order.findById(req.params.id);
  let user = await User.find({ _id: req.user._id });

  order.isActive = false;
  order.save();
  res.send(order);
});

router.post("/create", auth, async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let restaurant = await Restaurants.find({ _id: req.body.selectedRest });
  let user = await User.find({ _id: req.user._id });
  let order = new Order({
    orderOwner: req.body.orderOwner,
    orderIncludes: req.body.orderIncludes,
    orderAddress: req.body.orderAddress,
    orderOwnerPhone: req.body.orderOwnerPhone,
    isActive: req.body.isActive,
    trashedOrder: req.body.trashedOrder,
    orderNumber: await generateOrderNumber(Order),
    user: { user_id: req.user._id, name: user[0].name, email: user[0].email },
    restaurant: {
      selectedRest: req.body.selectedRest,
      name: restaurant[0].resName,
    },
  });

  post = await order.save();
  let user2 = user[0];
  user2.orders.push(post);
  console.log(user2);
  await user2.save();
  res.send(post);
});

module.exports = router;

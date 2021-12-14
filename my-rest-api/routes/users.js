const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateUpdate } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();


router.get("/myprofile/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .exec((err, user) => {
      if (err) return console.log(err);
      res.status(200).json(user);
    });
});

router.get("/all", (req, res) => {
  User.find({})
    .select("-password")
    .exec((err, users) => {
      if (err) return console.log(res.status(500).json(err));
      res.status(200).json(users);
    });
});
router.delete("/delete/:id", auth, async (req, res) => {
  const user = await User.findOneAndRemove({
    _id: req.params.id,
  });
  if (!user)
    return res
      .status(404)
      .send("The user with the given ID was not found.");
  res.send(user);
});

router.put("/myprofile/:id/edit", auth, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(console.log(error.details[0].message));

  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  user = await User.findOne({
    _id: req.params.id,
  });
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "biz",
      "isActive",
      "lastName",
      "address",
      "role",
      "phone",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(
    _.pick(user, [
      "name",
      "email",
      "biz",
      "isActive",
      "lastName",
      "address",
      "role",
      "phone",
    ])
  );
});

router.post("/logout", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  user.isActive = false;
  await user.save();
  res.send({
    user,
    success: true,
  });
});
module.exports = router;

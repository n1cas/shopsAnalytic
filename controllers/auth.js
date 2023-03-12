const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("./../config/keys");
const errorHandler = require("./../utils/errorHandler");

module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email: email });

  if (!candidate) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const passResult = bcrypt.compareSync(password, candidate.password);

  if (passResult) {
    const token = jwt.sign(
      {
        email,
        userId: candidate._id,
      },
      keys.jwt,
      { expiresIn: 60 * 60 }
    );

    res.status(200).json({
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({
      message: "Wrong password or email",
    });
  }
};

module.exports.register = async function (req, res) {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email: email });

  if (candidate) {
    res.status(409).json({
      message: "Carrent email already registred",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

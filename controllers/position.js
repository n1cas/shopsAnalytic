const Position = require("../models/Position");
const errorHandler = require("./../utils/errorHandler");

module.exports.getByCategoryId = async function (req, res) {
  try {
    const { user, params } = req;
    const position = await Position.find({
      category: params.categoryId,
      user: user.id,
    });
    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const { body } = req;
    const { name, cost, category, user } = body;
    const position = await new Position({
      name,
      cost,
      category,
      user: user.id,
    }).save();

    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function (req, res) {
  try {
    const { user, params } = req;

    await Position.remove({
      _id: params.id,
    });

    res.status(200).json({
      message: "Position successfull removed.",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  try {
    const { body, params } = req;
    const position = await Position.findByIdAndUpdate(
      { _id: params.id },
      { $set: body },
      { new: true }
    );

    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
};

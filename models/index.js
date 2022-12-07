const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Review = require("./review");
const User = require("./user");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Review = Review;
db.User = User;

Review.init(sequelize);
User.init(sequelize);

module.exports = db;
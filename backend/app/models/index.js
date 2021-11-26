const mongoose = require("mongoose");
const createSalerModel = require("./saler.model");
const createProductModel = require("./product.model");
const createUserModel = require("./user.model");

const db = {};
db.mongoose = mongoose;
db.Saler = createSalerModel(mongoose);
db.Product = createProductModel(mongoose);
db.User = createUserModel(mongoose);

module.exports = db;

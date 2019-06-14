var mongoose = require("mongoose");
var COLLECTION_NAME = "users";

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model(COLLECTION_NAME, userSchema);

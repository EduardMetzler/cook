const { Schema, model, Types } = require("mongoose");

const schema = new Schema({

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  persone:{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  }
});

module.exports = model("User", schema);

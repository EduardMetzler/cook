const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  ownerId: { type: Types.ObjectId, ref: "User" },

  name: { type: String, required: true, unique: false },
  description: { type: String, required: true,unique: false },
  private: { type: String, required: true,unique: false },
  ingredients: [ { ingredient:  { type: String, required: true }, amount:  { type: String, required: true }, unit:  { type: String, required: true } } ]

});

module.exports = model("Recipe0", schema);



const { Schema, model } = require('mongoose');

const teamSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String },
  appointment: { type: String },
  size: { type: Number },
});

module.exports = model('Team', teamSchema);

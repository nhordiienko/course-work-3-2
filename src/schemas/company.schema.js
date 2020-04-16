const { Schema, model } = require('mongoose');

const companySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  address: { type: String },
  occumpation: { type: String },
  description: { type: String },
});

module.exports = model('Company', companySchema);

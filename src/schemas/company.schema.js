const { Schema, model } = require('mongoose');

const companySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
});

module.exports = model('Company', companySchema);

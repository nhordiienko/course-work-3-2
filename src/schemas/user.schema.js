const { Schema, model } = require('mongoose');

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  secondName: { type: String },
  position: { type: String },
  activeHours: {
    from: { type: Number },
    to: { type: Number },
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
});

module.exports = model('User', userSchema);

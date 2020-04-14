const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('mongoose');
require('dotenv').config();

const { BD_USER, BD_PASSWORD, BD_LINK } = process.env;
connect(`mongodb+srv://${BD_USER}:${BD_PASSWORD}@${BD_LINK}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection complited successful');
});

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

module.exports = { app };

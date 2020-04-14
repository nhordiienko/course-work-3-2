const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

module.exports = { app };

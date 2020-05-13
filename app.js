const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('mongoose');
const {
  company,
  admin,
  root,
  user,
  team,
} = require('./src/routers');
const errors = require('./src/helpers/errors');

connect(`mongodb+srv://admin:admin@cluster0-dnfdv.mongodb.net/wework?retryWrites=true&w=majority`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection completed successful');
});

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));
app.use('/', root);
app.use('/user', user);
app.use('/team', team);
app.use('/admin', admin);
app.use('/company', company);
app.use(errors);

module.exports = { app };

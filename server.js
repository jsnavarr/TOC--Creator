const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

var indexRouter = require('./public/routes/index');

app.use('/', indexRouter);

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port} ${process.env.DATABASE_URL}`)
  });

module.exports = app;
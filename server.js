const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./routes/api/users'));

// app.use(require('./config/auth'));

// var indexRouter = require('./public/routes/index');

// app.use('/', indexRouter);

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work 
app.get('/*', function(req, res) {
    console.log('calling server');
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });

module.exports = app;
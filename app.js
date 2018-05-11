const express = require('express');
const mysql = require('mysql');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'csc675project'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connect to db...');
});

const index = require('./routes/index');
const teams = require('./routes/teams');
const players = require('./routes/players');
const coaches = require('./routes/coaches');
const mascots = require('./routes/mascots');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.db = db;

app.use('/', index);
app.use('/teams', teams);
app.use('/players', players);
app.use('/coaches', coaches);
app.use('/mascots', mascots);

app.listen('6750', () => {
  console.log('Listening on port 6750...');
});

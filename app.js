const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: './.env' });
//const db = require('./model/db');
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

db.connect(function(err) {
  if(err) {
    console.log('Error connecting to the database');
  } else {
    console.log('Connected to MYSQL');
  }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(2000, () => {
  console.log("listening on port 2000");
})
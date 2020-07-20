const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const passport = require('passport');

//Inicialization
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));

// routes
app.set('view engine', '.hbs');
app.use(require ('./routes/index.routes'));


//Global Variable

// static files
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;

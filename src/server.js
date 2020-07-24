import express from 'express'
import handlebars from'express-handlebars'
import path from 'path'
import passport from 'passport'
import database from './database.js'  

//Inicialization
const app = express();

// settings
database.configDb();
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
//Midlewares
app.use(express.json())

// routes
app.set('view engine', '.hbs');
app.use(require ('./routes/index.routes'));
app.use(require('./routes/users.routes.js'))

//Global Variable

// static files
app.use(express.static(path.join(__dirname, 'public')));
export default app;

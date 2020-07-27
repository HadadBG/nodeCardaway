import express from 'express'
import handlebars from'express-handlebars'
import path from 'path'
import passport from 'passport'
import {database,client} from './database.js'  
import session from  "express-session"
import mongo from  "connect-mongo"

//Inicialization
const app = express();
const MongoStore = mongo(session)
// settings
let promise = database.configDb();

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
//Midlewares
app.use(express.json())

promise.then(()=>{
app.use(session({
    resave:"false",
    saveUninitialized: true,
    secret:"estoessecretoshhh",
    store: new MongoStore({ client: database.client })
}));
}).catch(e=>{
  console.log(e)
})


app.use(passport.initialize());
app.use(passport.session());
// routes
app.set('view engine', '.hbs');
app.use(require ('./routes/index.routes'));
app.use(require('./routes/users.routes.js'))


// static files
app.use(express.static(path.join(__dirname, 'public')));
export default app;

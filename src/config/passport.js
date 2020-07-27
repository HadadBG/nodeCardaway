const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import PostalesDAO from "./../dao/postalesDAO.js"

passport.use(new LocalStrategy(
  async (username, password, done) => {
    let loginReuslt= PostalesDAO.login({
      username:username,
      password:password
    } )
  // Match Email's User
  if (loginReuslt==-1) {
    return done(null, false, { message: 'Usuario no regitrado' });
  } else if(loginReuslt == 1){
    // Match Password's User
      return done(null, username);
  }
    else {
      return done(null, false, { message: 'Contraseña Incorrecta' });
    }
  }
));



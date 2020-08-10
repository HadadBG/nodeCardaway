import usuariosDao from "../dao/usersDAO.js";
import adminDao from "../dao/adminDao.js";
import passport from "passport";
const nodemailer = require("nodemailer");
var path = require("path");

export default class userController {
  static async agregarUsuario(req, res) {
    let result = validarCampos(req.body);
    if (result.errors.length == 0) {
      try {
        let response = await usuariosDao.insertUsuario(result.json);
      } catch (e) {
        result.errors.push({
          id: "correo",
          msg: "Correo electronico ya registrado"
        });
      }
    }
    res.json({ errors: result.errors });
  }
  static async logIn(req, res) {
    if (!(req.body.username && req.body.password)) {
      return res.json({ success: false, msg: "Ocurrio un error" });
    }
    let response = await adminDao.login(req.body);
    if (response.loginResult == 1) {
      req.session.admin=true
      return res.json({ success: true, msg: req.body.username });
    } else if (response.loginResult == 0) {
      return res.json({ success: false, msg: "Contraseña Incorrecta" });
    } else {
      passport.authenticate("local", function(err, user, info) {
        if (err) {
          return res.json(err);
        }
        if (!user) {
          return res.json(info);
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.json(err);
          }
          return res.json(info);
        });
      })(req, res);
    }
  }
  static renderEnvio(req, res) {
    res.render("usuario/envio", { noButtons: true });
  }
  static prueba(req, res) {
    enviaCorreo();
    res.json({ succes: "nice" });
  }
}

async function enviaCorreo() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Cardaway.sender@gmail.com",
      pass: "hola1234#"
    }
  });
  let htmlTemplate = `
  <html>
  <head>
 
<style>
.postal{
 margin:auto; 
}
.nav-wrapper {
  background-color: #23374b;
}
h1{
color: #039be5;
margin-bottom:2rem;
}
.nav-wrapper img{
  margin-left:2rem;
}

.imgContainer{
    text-align:center;
}
.imgContainer img{
  margin:2rem;
  width: 70%;
  height: 100%;
  object-fit: cover;

}

.margin{
  width:100%;
}
</style>
  </head>
  <body>
  <header>
  <nav>
    <div class="nav-wrapper">
    <img src="cid:logo" alt="">
    </div>
  </nav>

  </header>
<div class="imgContainer">    
<img class="postal" src="cid:postal" alt="header">
</div>
<div class="imgContainer">
  <h1>Gracias por usar Cardaway</h1>  
</div>
  <img class="margin" src="https://www.filepicker.io/api/file/UOesoVZTFObSHCgUDygC" alt="">  

  </body>
  </html>`;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cardaway 📨" <Cardaway.sender@gmail.com>', // sender address
    to: "hadad.bautista@gmail.com", // list of receivers
    subject: "Postal Cardaway ✉️✉️ 📬",
    attachments: [
      {
        filename: "postal.png",
        path: path.resolve("./src/public/postales/Amor/gato_01.png"),
        cid: "postal" //my mistake was putting "cid:logo@cid" here!
      },
      {
        filename: "Logo.png",
        path: path.resolve("./src/public/images/logo.png"),
        cid: "logo" //my mistake was putting "cid:logo@cid" here!
      }
    ], // Subject line
    html: htmlTemplate // html body
  });
}

function validarCampos(json) {
  let ret = {};
  ret["errors"] = [];
  if (json.nombre == "")
    ret.errors.push({ id: "nombre", msg: "Campo Obligatorio" });
  if (json.primerAp == "")
    ret.errors.push({ id: "primerAp", msg: "Campo Obligatorio" });
  if (json.password.length < 5)
    ret.errors.push({ id: "password", msg: "Minimo 5 Caracateres" });
  if (!/.+@.+\..+/.test(json.correo))
    ret.errors.push({ id: "correo", msg: "Correo Invalido" });
  if (json.fechaNac == "")
    ret.errors.push({ id: "fechaNac", msg: "Campo Obligatorio" });

  if (ret.errors.length == 0) {
    ret["json"] = {};
    ret["json"]["nombre"] = json.nombre;
    ret["json"]["primerAp"] = json.primerAp;
    ret["json"]["segundoAp"] = json.segundoAp;
    ret["json"]["passwd"] = json.password;
    ret["json"]["_id"] = json.correo;
    ret["json"]["fechaNac"] = json.fechaNac;
  }
  return ret;
}

import usuariosDao from "../dao/usersDAO.js"
import passport from "passport"
function validarCampos(json){
  let ret={}
  ret["errors"]=[]
  if(json.nombre == "" )
    ret.errors.push({id:"nombre",msg:"Campo Obligatorio"})
  if(json.primerAp == "")
    ret.errors.push({id:"primerAp",msg:"Campo Obligatorio"})
  if(json.password.length < 5 )
    ret.errors.push({id:"password",msg:"Minimo 5 Caracateres"})
  if(!/.+@.+\..+/.test(json.correo)) 
    ret.errors.push({id:"correo",msg:"Correo Invalido"})
  if(json.fechaNac == "")
    ret.errors.push({id:"fechaNac",msg:"Campo Obligatorio"})

   if(ret.errors.length == 0){
      ret["json"]={} 
      ret["json"]["nombre"] = json.nombre
      ret["json"]["primerAp"] = json.primerAp
      ret["json"]["segundoAp"] = json.segundoAp
      ret["json"]["passwd"] = json.password
      ret["json"]["_id"] = json.correo
      ret["json"]["fechaNac"] = json.fechaNac
   }
  return ret
}

export default class  userController{
static async agregarUsuario (req, res) {
  console.log(req)
  let result=validarCampos(req.body)
  if(result.errors.length == 0){
    try{
  let response=await usuariosDao.insertUsuario(result.json)
    }catch(e){
      result.errors.push({id:"correo",msg:"Correo electronico ya registrado"})
    } 
  }
  res.json({errors:result.errors});
  
};

static logIn(req,res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {  return res.json(err) }
    if (!user) {  return res.json(info); }
    req.logIn(user, function(err) {
      if(err){
	return res.json(err)
      }
	return res.json(info) 
    });
  })(req, res);  
}
static renderEnvio(req,res){
  res.render('usuario/envio',{noButtons:true})
}
static prueba(req,res){
const nodemailer = require("nodemailer");
console.log("Saludoe")
// async..await is not allowed in global scope, must use a wrapper
async function main() {
   
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
	user: 'Cardaway.sender@gmail.com',
        pass: 'hola1234#'
    }
  });
  let htmlTemplate=`
  <html>
  <head>
<style>
  h1 {color:red;}
</style>
  </head>
  <body>
    <h1>A Blue Heading</h1> 
  </body>
  </html>`
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cardaway 📨" <Cardaway.sender@gmail.com>', // sender address
    to: "bar@example.com, hadad.bautista@gmail.com", // list of receivers
    subject: "Postal Cardaway ✉️✉️ 📬", // Subject line
    html:htmlTemplate , // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
  main();
  res.json({"succes":"nice"})
}

}




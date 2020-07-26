import usuariosDao from "../dao/usersDAO.js"
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



}




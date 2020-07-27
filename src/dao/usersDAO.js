var cardaway
var usuarios
import bcrypt from "bcryptjs"
export default class UsuariosDAO {
  static async injectDB(conn) {
    if (usuarios) {
      return;
    }
    try {
      cardaway = await conn.db(process.env.CARDAWAY_NS);
      usuarios = await conn.db(process.env.CARDAWAY_NS).collection("usuarios");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in PostalesDAO: ${e}`
      );
    }
  }
  static async insertUsuario(toInsertUsuario){
    if(toInsertUsuario.fechaNac)
      toInsertUsuario.fechaNac = new Date(toInsertUsuario.fechaNac)
    if(toInsertUsuario.passwd)
      toInsertUsuario.passwd= await bcrypt.hash(toInsertUsuario.passwd, 10)
   let response = {insertedId:undefined, errors:undefined}
      let insertResult = await usuarios.insertOne(toInsertUsuario)
      response.insertedId=insertResult.insertedId
    return response
    
  }
  static async deleteUsuario(toDeleteId){
    let response = {n:undefined}
    let deleteResult=await usuarios.deleteOne({_id:toDeleteId})
      response.n=deleteResult.deletedCount

    return response
  }
static async login({username,password}){
  let usuario = await usuarios.findOne({_id:username})
  if(usuario.passwd == undefined){
    return {loginReuslt:-1,usuario:usuario}
  }
  if(await bcrypt.compare(password,usuario.passwd)){
    return {loginReuslt:1,usuario:usuario}
  }
  else{
    return {loginReuslt:0,usuario:usuario}
  }
 } } 

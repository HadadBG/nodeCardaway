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
    try{
      let insertResult = await usuarios.insertOne(toInsertUsuario)
      response.insertedId=insertResult.insertedId
    } 
    catch(e){
      response.errors=e
    }
    return response
    
  }
  static async deleteUsuario(toDeleteId){
    let response = {errors:undefined}
    try{
    await usuarios.deleteOne({_id:toDeleteId})

    }
    catch(e){
      response.errors=e
    }
    return response
  }


}



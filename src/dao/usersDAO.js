var cardaway;
var usuarios;
import bcrypt from "bcryptjs";
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
  static async insertUsuario(toInsertUsuario) {
    if (toInsertUsuario.fechaNac)
      toInsertUsuario.fechaNac = new Date(toInsertUsuario.fechaNac+"T12:00:00");
    if (toInsertUsuario.passwd)
      toInsertUsuario.passwd = await bcrypt.hash(toInsertUsuario.passwd, 10);
    let response = { insertedId: undefined, errors: undefined };
    let insertResult = await usuarios.insertOne(toInsertUsuario);
    response.insertedId = insertResult.insertedId;
    return response;
  }
  static async deleteUsuario(toDeleteId) {
    let response = { n: undefined };
    let deleteResult = await usuarios.deleteOne({ _id: toDeleteId });
    response.n = deleteResult.deletedCount;

    return response;
  }
  static async login({ username, password }) {
    let usuario = await usuarios.findOne({ _id: username });
    if (usuario == null) {
      return { loginResult: -1, usuario: usuario };
    }
    if (await bcrypt.compare(password, usuario.passwd)) {
      return { loginResult: 1, usuario: usuario };
    } else {
      return { loginResult: 0, usuario: usuario };
    }
  }
  static async getUsuario({ email }) {
    let usuario = usuarios.findOne({ _id: email });
    return usuario;
  }
  static async getUsuarios({
    textToSearch = null,
    page = 0,
    usersPerPage = 6
  }) {
    let response = await usuarios
      .find(
        {
          $or: [
            { _id: { $regex:textToSearch ,$options:'i'} },
            { nombre: { $regex:textToSearch,$options:'i'  } },
           
          ]
        },
        {
          limit: usersPerPage,
          skip: page * usersPerPage
        }
      )
      .toArray();
    return response;
  }
    static async updateUsuario(correo,updateUsuario){
     return usuarios.updateOne({_id:correo},{
       $set:{nombre:updateUsuario.nombre,
            primerAp:updateUsuario.primerAp,
            segundoAP:updateUsuario.segundoAP,
            genero:updateUsuario.genero,
            fechaNac:updateUsuario.fechaNac,
            passwd:  await bcrypt.hash(updateUsuario.passwd, 10)
    }}) 
      
    }
}

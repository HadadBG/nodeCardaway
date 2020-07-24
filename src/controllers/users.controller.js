import usuariosDao from "../dao/usersDAO.js"
function hola(){

}

export default class  userController{
static async agregarUsuario (req, res) {
  hola();
  let response=await usuariosDao.insertUsuario(req.body)
  if (response.errors)
    console.log(response.errors)
  res.json();
  
};



}




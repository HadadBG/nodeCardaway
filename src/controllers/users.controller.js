import usuariosDao from "../dao/usersDAO.js"
export default class  userController{
static async agregarUsuario (req, res) {
  response=await usuariosDao.insertUsuario(req.body)
  if (response.errors)
    console.log(response.errors)
  res.json();
  
};



}




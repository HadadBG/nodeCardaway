import usuariosDao from "../dao/usersDAO.js";
import formidable from "formidable";
import path from "path";
import mv from "mv";
import postalesDao from "../dao/postalesDAO.js";
export default class adminController {
  static renderAdmin(req, res) {
    if (!req.session.admin) {
      res.redirect("/");
    }
    //res.render('index');
    res.render("admin/admin", { noButtons: true });
  }

  static async getUsuarios(req, res) {
    let reqJson = {};
    reqJson["page"] = parseInt(req.query.page);
    reqJson["textToSearch"] = req.query.textToSearch;
    reqJson["usersPerPage"] = parseInt(req.query.usersPerPage);
    let usuarios = await usuariosDao.getUsuarios(reqJson);
    res.json(usuarios);
  }
  static async deleteUsuario(req, res) {
    let deleteResponse;
    let responseJson = { success: false };
    try {
      deleteResponse = await usuariosDao.deleteUsuario(req.query.correo);
    } catch (e) {
      console.log(e);
    }
    if (deleteResponse.n == 1) responseJson["success"] = true;

    res.json(responseJson);
  }
  static async insertPostal(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      let jsonPostal = {};
      jsonPostal["brief"] = fields.brief;
      jsonPostal["categoria"] = fields.categoria;
      switch (files.file.type) {
        case "image/jpeg":
          jsonPostal["extension"] = "jpeg";
          break;
        case "image/gif":
          jsonPostal["extension"] = "gif";
          break;
        case "image/png":
          jsonPostal["extension"] = "png";
          break;
        default:
	  return res.json({ success: false,msg:"Formato Invalido" });
          break;
      }
      jsonPostal["fechaSub"] = new Date()
      let result=await postalesDao.insertPostales([jsonPostal])
      let id= result.insertedIds[0]


      var oldpath = files.file.path;
      var newpath = path.join(__dirname, "../public/postales/"+id+"."+jsonPostal.extension);
      mv(oldpath, newpath, function(err) {
	if (err) throw err;
	res.json({success:true,msg:"Postal agregada correctamente"})
      });
    });
  }
}

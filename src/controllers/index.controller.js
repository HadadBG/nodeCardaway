import PostalesDAO from "../dao/postalesDAO.js"
export default class  indexController{
static renderIndex (req, res) {
  //res.render('index');
  res.render('index');
};

static async getPostales  (req,res){
  let reqJson={}
  reqJson["postalesPerPage"]=parseInt(req.query.postalesPerPage)
  reqJson["page"]=parseInt(req.query.page)
  reqJson["filter"]=JSON.parse(req.query.filter)
  reqJson["textToSearch"]=req.query.textToSearch
  let postales= await PostalesDAO.getPostales(reqJson)
  res.json(postales) 
}

static renderFormulario(req,res){

  res.render('formulario', {noButtons:true})  
}




}

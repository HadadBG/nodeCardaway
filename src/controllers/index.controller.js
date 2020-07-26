import PostalesDAO from "../dao/postalesDAO.js"
export default class  indexController{
static renderIndex (req, res) {
  //res.render('index');
  res.render('index');
};

static async getPostales  (req,res){
  let reqJson={}
  reqJson["page"]=parseInt(req.query.page)
  reqJson["filter"]=JSON.parse(req.query.filter)
  let postales= await PostalesDAO.getPostales(reqJson)
  res.json(postales)
  
}

static renderFormulario(req,res){

  res.render('formulario', {registro:true})  
}




}

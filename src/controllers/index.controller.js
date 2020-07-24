import PostalesDAO from "../dao/postalesDAO.js"
export default class  indexController{
static renderIndex (req, res) {
  //res.render('index');
  res.render('index');
};

static async getPostales  (req,res){
  let postales= await PostalesDAO.getPostales({page:0,postalesPerPage:9});
   
  res.json(postales);
}

static renderFormulario(req,res){

  res.render('formulario', {registro:true})  
}




}

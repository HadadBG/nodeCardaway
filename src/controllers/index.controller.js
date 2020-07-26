import PostalesDAO from "../dao/postalesDAO.js"
export default class  indexController{
static renderIndex (req, res) {
  //res.render('index');
  res.render('index');
};

static async getPostales  (req,res){
  console.log(req)
  let postales= await PostalesDAO.getPostales(req.body);
   
  res.json(postales);
  
}

static renderFormulario(req,res){

  res.render('formulario', {registro:true})  
}




}

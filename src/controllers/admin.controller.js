export default class  adminController{
static renderAdmin (req, res) {
  if(!req.session.admin){
   res.redirect("/") 
  }
  //res.render('index');
  res.render('admin/admin');
};






}

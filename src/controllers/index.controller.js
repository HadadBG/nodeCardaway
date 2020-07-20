const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  //res.render('index');
  res.render('index');
};

indexCtrl.getPostales = (req,res) =>{
  
  res.json({hola:"Saludos Camarada"});
}


module.exports = indexCtrl;

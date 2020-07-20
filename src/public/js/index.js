var wrapper=document.getElementById("wrapper")
var loginForm=document.getElementById("datos")
var content=document.getElementById("postalContainer")

//
//Materialize Inicialization
//
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {});
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {});
});

document.getElementById("datos").addEventListener("submit", () => {
  alert("Holsa");
});

document.addEventListener(
  "click",
  function(event) {
    if (event.target.matches(".gal-img")) {
      modal.style.display = "block";
      modalImg.src = event.target.src;
      if (modalImg.height > modalImg.width) {
        modalImg.style.width = "50%";
      } else {
        modalImg.style.width = "100%";
        modalImg.style.height = "auto";
      }
    }
  },
  false
);

document.getElementById("close").addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("scroll", ()=>{
  let {scrollTop,scrollHeight,clientHeight} = document.documentElement;

  console.log(scrollTop);
  if(clientHeight+scrollTop >= scrollHeight-5){
  }
})
/*)*/
//e.preventDefault();
//$.ajax({

//method:"POST",
//url:"./php/functions/login.php",
//data: $("#datos").serialize(),
//cache:false,
//success:function(respAX){

//var AX = JSON.parse(respAX);

//if(AX.resp != 0 && AX.resp != -1){

//Swal.fire(
//'Bienvenid@!',
//AX.resp,
//'success'

//).then(function(){

//window.location.replace("./php/pages/user_page.php");

//})
//}
//else if(AX.resp==-1){
//Swal.fire(
//'Bienvenid@!',
//"Administrador",
//'success'

//).then(function(){
//window.location.replace("./php/pages/admin.php");
//})

//}
//else{

//Swal.fire(
//'Cardaway',
//'Usuario o contraseña incorrectos',
//'warning'
//)

//}

//}

//})

//}
const postalesIni=10
let actualPage=0
let postPerPage=6

//});
//var post_ini=6;
//carga_postales(post_ini);
//var limite=6;
//$(window).scroll(function() {
//if($(window).scrollTop() + $(window).height() == $(document).height()){

//carga_postales(limite);

//}
//});

//});

//var offset=0;

//function carga_postales(limit){
//$.ajax({
//method:"POST",
//url:"./php/functions/cargar_postales.php",
//cache:false,
//data:{
//offset : offset,
//limit : limit
//},
//success:function(respAX){
////console.log(respAX);
////alert(respAX);
//var i=0;
////alert(respAX);
//var AX = JSON.parse(respAX);

//AX.postales.forEach(element => {
//offset+=1;
//$("#cargador"+String(i%3))[0].innerHTML +=
//'<img src="'+element+'" class="gal-img" alt="">';
//i+=1;
//});

//}

//});
/*}*/

var wrapper = document.getElementById("wrapper");
var loginForm = document.getElementById("datos");
var content = document.getElementById("postalContainer");
var page = 0;
var postalCharger = document.getElementById("postalCharger");
var destacadosCharger = document.getElementById("destacadosCharger");
var filter = {};
var cargandoPostales = false;
var reachFin=false;
var categorias = [
  "All",
  "Amor",
  "Fechas Festivas",
  "Vintage",
  "Comida",
  "Paisajes",
  "Otros"
];
var success;
const myswal = Swal.mixin({
  onClose: () => {
    if (success) location.href = "/";
  }
});

//
//Materialize Inicialization
//

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {});
});

document.getElementById("datos").addEventListener("submit", event => {
  event.preventDefault();
  let username = document.getElementById("usuario").value;
  let password = document.getElementById("contrasena").value;
  axios
    .post("/logIn", { username: username, password: password })
    .then(res => {
      if (res.status == 200) {
        if (res.data.success) {
          myswal.fire("Bienvenid@!", res.data.msg, "success");
          success = true;
        } else {
          myswal.fire("Cardaway", res.data.msg, "error");
          success = false;
        }
      }
    })
    .catch(erro => {
      myswal.fire("Cardaway", "Ocurrio un error de comunicacion", "error");
      success = false;
    });
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
function cargaDestacados() {
  axios
    .get("/getPostales", {
      params: {
        postalesPerPage: 10,
        sort: { noEnvios: 1 }
      }
    })
    .then(res => {
      res.data.forEach(dato => {
        destacadosCharger.innerHTML += getDestacadosRow(dato);
      });
      var elems = document.querySelectorAll(".carousel");
      var instances = M.Carousel.init(elems, {});
    })
    .catch(err => {
      console.log(err);
      setTimeout(cargaPostales, 2000);
    });
}
cargaPostales();
cargaDestacados();
function cargaPostales() {
    if(cargandoPostales===true) {//we want it to match
        setTimeout(cargaPostales, 50);//wait 50 millisecnds then recheck
        return;
    }
  cargandoPostales = true
  axios
    .get("/getPostales", {
      params: {
        page: page,
        filter: filter,
        postalesPerPage: 9,
        sort: { fechaSub: -1 }
      }
    })
    .then(function(res) {
      if (res.status == 200) {
	if (res.data.length===0){
	  if(!reachFin){
	    reachFin=true
	    wrapper.classList.remove("wrapper")
	    wrapper.innerHTML=`
  <div class="textoFin">
    <span>Parece que ya no hay mas postales</span>
  </div>
`;
	  }
	}
	else{
        let postalBlock = document.createElement("div");
        postalBlock.setAttribute("class", "postalContainer");
        res.data.forEach((postal, idx) => {
          postalBlock.innerHTML += ` 
      <div class="postal post${idx + 1}">
        <img src="/postales/${postal._id}.${postal.extension}" alt="${idx}"/>
      </div> 
 `;
        });
        page += 1;
        postalCharger.appendChild(postalBlock);
	}
      }
    })
    .catch(function(err) {
      console.log(err);
      setTimeout(cargaPostales, 2000);
    })
    .then(function() {
      cargandoPostales = false
    });
}
window.addEventListener("scroll", () => {
  
  let { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop == scrollHeight) {
    console.log("Scrolling:"+clientHeight +","+scrollTop+","+scrollHeight)
    cargaPostales();
  }
});

categorias.forEach((categoria, idx) => {
  let htmlCategory;
  if (categoria == "Fechas Festivas") {
    htmlCategory = document.getElementById("catFechas");
  } else {
    htmlCategory = document.getElementById("cat" + categoria);
  }
  htmlCategory.addEventListener("click", () => {   
    if(reachFin){
      reachFin=false
      wrapper.classList.add("wrapper")
      wrapper.innerHTML=`
        <div class="charging chargingPost1"></div>
        <div class="charging chargingPost2"></div>
        <div class="charging chargingPost3"></div>
        <div class="charging chargingPost4"></div>
        <div class="charging chargingPost5"></div>
`;
    }

    page = 0;
    if (categoria == "All") {
      filter = {};
    } else {
      filter = { categoria: categoria };
    }
    postalCharger.innerHTML = "";
    cargaPostales();
  });
});
function getDestacadosRow(json) {
  innerHTML = `
      <a class="carousel-item">
        <img src="/postales/${json._id}.${json.extension}" />
      </a>
 `;
  return innerHTML;
}

/*)*/
//e.preventDefault();
//$.ajax({

//method:"POST",
//url:"./php/functions/login.php",
//data: $("#datos").serialize(), cache:false, success:function(respAX){ var AX = JSON.parse(respAX); if(AX.resp != 0 && AX.resp != -1){ Swal.fire(
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

var modal = document.getElementsByClassName("myModal")[0];
var span = document.getElementById("close");

var img = document.getElementsByClassName("postal");
var modalImg = document.getElementById("modal-test");

document.addEventListener(
  "click",
  function(event) {
    if (event.target.matches(".postal img")) {
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

span.addEventListener("click", () => {
  modal.style.display = "none";
});
/*document.getElementById("enviar").addEventListener("click", () => {*/
  ////axios.get("/envios",{postal:})
/*});*/

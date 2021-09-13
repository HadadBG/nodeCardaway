var seccion = "usuarios";
var usersPerPage = 4;
var postalesPerPage = 4;
var page = 0;
var pageP = 0;
var textToSearch = "";
let formularioAddPostal = document.getElementById("formPostal");
let cargadorU = document.getElementById("cargadorU");
let buscadorU = document.getElementById("buscadorU");
let cargadorP = document.getElementById("cargadorP");
let buscadorP = document.getElementById("buscadorP");
let sectionPostales = document.getElementById("sectionPostales");
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {});
});
document.getElementById("leftArrowP").addEventListener("click", () => {
  if (pageP != 0) {
    pageP -= 1;
  }
  cargaPostales();
  document.getElementById("noPageP").innerText = pageP + 1;
});
document.getElementById("rightArrowP").addEventListener("click", () => {
  pageP += 1;
  cargaPostales();
  document.getElementById("noPageP").innerText = pageP + 1;
});

document.getElementById("leftArrow").addEventListener("click", () => {
  if (page != 0) {
    page -= 1;
  }
  cargaUsuarios();
  document.getElementById("noPage").innerText = page + 1;
});
document.getElementById("rightArrow").addEventListener("click", () => {
  page += 1;
  cargaUsuarios();
  document.getElementById("noPage").innerText = page + 1;
});

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {});
  elems = document.querySelectorAll(".tabs");
  instances = M.Tabs.init(elems, {});
});
var tabContent;
tabcontent = document.getElementsByClassName("tabContent");
for (i = 1; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
}

function openTab(evt, tabName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " selected";
}
function cargaUsuarios() {
  axios
    .get("/getUsuarios", {
      params: {
        page: page,
        textToSearch: buscadorU.value,
        usersPerPage: usersPerPage
      }
    })
    .then(res => {
      if (res.status == 200) {
        cargadorU.innerHTML = "";
        res.data.forEach(dato => {
          cargadorU.innerHTML += getUserRow(dato);
        });
        Array.from(document.getElementsByClassName("deleteButton")).forEach(
          button => {
            let correo =
              button.parentElement.parentElement.children[2].innerText;

            button.addEventListener("click", () => {
              axios
                .delete("/deleteUsuario", {
                  params: {
                    correo: correo
                  }
                })
                .then(res => {
                  if (res.status == 200) {
                    if (res.data.success) {
                      cargaUsuarios();
                      Swal.fire(
                        "Cardaway",
                        "Usuario Eliminado con exito",
                        "success"
                      );
                    } else {
                      Swal.fire("Cardaway", "Ocurrio un error", "error");
                    }
                  } else {
                    Swal.fire("Cardaway", "Error de Conexion", "error");
                  }
                });
            });
          }
        );
      } else console.log("Error al cargar los Usuarios");
    });
}

function cargaPostales() {
  axios
    .get("/getPostales", {
      params: {
        page: pageP,
        textToSearch: buscadorP.value,
        filter: {},
        postalesPerPage: postalesPerPage
      }
    })
    .then(res => {
      if (res.status == 200) {
        cargadorP.innerHTML = "";
        res.data.forEach(dato => {
          cargadorP.innerHTML += getPostalesRow(dato);
        });
        Array.from(document.getElementsByClassName("deletePostales")).forEach(
          button => {
            let id =
              button.parentElement.parentElement.children[0].children[0].alt;

            button.addEventListener("click", () => {
              axios
                .delete("/deletePostales", {
                  params: {
                    toDeletePostalId: id
                  }
                })
                .then(res => {
                  if (res.status == 200) {
                    if (res.data.success) {
                      cargaPostales();
                      Swal.fire(
                        "Cardaway",
                        "Postal eliminada correctamente",
                        "success"
                      );
                    } else {
                      Swal.fire("Cardaway", "Ocurrio un error", "error");
                    }
                  } else {
                    Swal.fire("Cardaway", "Error de Conexion", "error");
                  }
                });
            });
          }
        );
      } else console.log("Error al cargar los Usuarios");
    });
}
buscadorU.addEventListener("input", cargaUsuarios);
buscadorP.addEventListener("input", cargaPostales);
function getUserRow(json) {
  innerHTML = `
	      <tr>
                <th class="imgContainer">
                  <img src="postales/Amor/kenny.gif" alt="algo" />
                </th>
                <th class="nombre">
		  ${json.nombre}
                </th>
                <th class="correo">
		  ${json._id}
                </th>
                <th class="nacimiento">
                  ${cumple(json.fechaNac)}
                </th>
                <th class="icono">
                  <i class="material-icons deleteButton">
                    delete
                  </i>
                </th>
              </tr>
 `;
  return innerHTML;
}
function getPostalesRow(json) {
  console.log(json.fechaSub);
  innerHTML = `
<tr>
                <th class="postalContainer">
                  <img
                    src="postales/${json._id}.${json.extension}"
                    alt=${json._id}
                  />
                </th>
                <th class="categoria">
		${json.categoria}
                </th>
                <th class="descripcion">
                  ${cumple(json.fechaSub)}
                </th>
                <th class="icono">
                  <i class="material-icons deletePostales">
                    delete
                  </i>
                </th>
                <tr>
	      `;
  return innerHTML;
}

cargaUsuarios();
formularioAddPostal.addEventListener("submit", e => {
  e.preventDefault();

  let modalAdd = M.Modal.getInstance(document.getElementById("modal1"));
  let descripcion = document.getElementById("textarea1").value;

  let file = document.getElementById("uploadedFile").files[0];
  let formData = new FormData();
  formData.append("file", file);
  formData.append("brief", descripcion);
  let nombreCat = document.getElementById("selector").value;
  formData.append("categoria", nombreCat);
  axios
    .post("/insertPostal", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      modalAdd.close();
      if (res.status == 200) {
        if (res.data.success) {
          cargaPostales();
          Swal.fire("Cardaway", res.data.msg, "success");
        } else {
          Swal.fire("Cardaway", res.data.msg, "error");
        }
      } else {
        Swal.fire("Cardaway", "Error de Conexion", "error");
      }
    });
});

sectionPostales.addEventListener("click", e => {
  e.preventDefault();
  cargaPostales();
});

var val1 = 5;
var val2 = 6;
var val3 = 8;
var val4 = 15;

var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Dataset #1",
      backgroundColor: "rgba(3,155,229,0.2)",
      borderColor: "rgba(3,155,229,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(3,155,229,0.4)",
      hoverBorderColor: "rgba(3,155,229,1)",
      data: [65, 59, 20, 81, 56]
    }
  ]
};

var options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false //this will remove only the label
        },
        gridLines: {
          display: false
        }
      }
    ]
  },
  legend: {
    display: false
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem) {
        return tooltipItem.yLabel;
      }
    }
  }
};

Chart.Bar("postalesMasEnviadasGraf", {
  options: options,
  data: data
});

data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset #1",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 20, 81, 56, 35, 85]
    }
  ]
};
options.scales.xAxes[0].ticks.display = true;

Chart.Bar("enviosSemanalesGraf", {
  options: options,
  data: data
});

data ={
labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset #1",
      backgroundColor: "rgba(235,228,21,0.2)",
      borderColor: "rgba(235,228,21,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(235,228,21,0.4)",
      hoverBorderColor: "rgba(235,228,21,1)",
      data: [65, 59, 20, 81, 56, 35, 85]
    }
  ]
}

Chart.Bar("categoriasGraf", {
  options: options,
  data: data
});
data = {
  datasets: [
    {
      data: [15, 15],

  backgroundColor: ["rgba(3, 155, 229,0.4)", "rgba(255, 0, 128,0.4)"],
  hoverBorderColor:["rgba(3, 155, 229,1)", "rgba(255, 0, 128,1)"],

    }
  ],
  labels: ["Hombres", "Mujeres"]
};
Chart.Doughnut("generoGraf", {
  options: {maintainAspectRatio:false},
  data: data
});

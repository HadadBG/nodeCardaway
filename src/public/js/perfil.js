var tabContent;
getDatos();
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
 document.addEventListener('DOMContentLoaded', function() {
    espanol= {
        cancel:"Cancelar",
        clear:"Limpiar",
        months:[
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
          ],
                            
          monthsShort:	
          [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic'
          ],
                            
          weekdays:	
          [
            'Domingo',
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado'
          ],
                            
          weekdaysShort:	
          [
            'Dom',
            'Lun',
            'Mar',
            'Mie',
            'Jue',
            'Vie',
            'Sab'
          ],
                            
          weekdaysAbbrev:	['D','L','M','Mi','J','V','S']
      }
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {i18n:espanol,format:"dddd d , mmmm  yyyy",
    yearRange:[1919,2019], setDefaultDate:true});
   
  });
  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
  });
function getDatos(){
  Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    
          (dd>9 ? '' : '0') + dd+'/',
          (mm>9 ? '' : '0') + mm+'/',
    
	  this.getFullYear(),
         ].join('');
};
date= document.getElementById("user-bday");
  var aux=new Date(date.innerText);
date.innerText=aux.yyyymmdd();
  console.log(aux.yyyymmdd());
}

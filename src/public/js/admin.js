

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
    elems = document.querySelectorAll('.tabs');
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

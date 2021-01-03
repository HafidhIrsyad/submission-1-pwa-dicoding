document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems, { draggable: true });
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
          elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
          elm.addEventListener("click", event => {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  const page = window.location.hash.substr(1);
  if (page === "") page = "tables";
  loadPage(page);
  
  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      var content = document.querySelector("#body-content");
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;

        // Slider
          if (page === 'tables', 'clubs', 'managers', 'news') {
            const slider = document.querySelectorAll('.slider');
            M.Slider.init(slider,{
              indicators: false,
              height: 300,
              duration: 600,
              interval: 1200
            });
          } if (page === 'managers') {
            const collapsible = document.querySelectorAll('.collapsible');
            M.Collapsible.init(collapsible, { accordion: true });
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        }   else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
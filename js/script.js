// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function(){
  var basePath = window.fragmentBasePath || "";
  
  loadHTMLFragment("header", basePath + "header.html");
  loadHTMLFragment("footer", basePath + "footer.html");
  
  document.addEventListener("click", function(e){
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menu-button");
    if (!sidebar) return;
    if (sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuButton.contains(e.target)) {
      toggleSidebar();
    }
  });

  // Asignar manejador al botón hamburguesa con prueba visual
  const menuButton = document.getElementById("menu-button");
  const sidebar = document.getElementById("sidebar");
  
  if (menuButton && sidebar) { 
    menuButton.addEventListener("click", function() {
      document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>Botón clicado</p>");
      sidebar.classList.toggle("active");
    });
  } else {
    console.error("Error: El menú lateral o el botón no existen en el DOM.");
  }
});

// Carga fragmentos HTML como el header y el footer
function loadHTMLFragment(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error " + response.status + " al cargar " + file);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if(id === "header") {
         addMenuToggle();
         updateHomeLink();
         attachSubmenuListeners();
      }
    })
    .catch(error => console.error('Error al cargar ' + file + ':', error));
}

// Función para activar/desactivar el menú lateral con prueba visual
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  document.body.insertAdjacentHTML("beforeend", "<p style='color:red;'>Botón clicado</p>");
  if (sidebar) {
    sidebar.classList.toggle("active");
  }
}

// Asignar manejador a los submenús
function attachSubmenuListeners() {
  let submenuParents = document.querySelectorAll('.menu-item.has-submenu > a');
  submenuParents.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      let submenu = item.nextElementSibling;
      let icon = item.querySelector('.submenu-toggle');
      if (submenu) {
        submenu.classList.toggle('open');
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-down');
      }
    });
  });
}

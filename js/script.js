// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function(){
  var basePath = window.fragmentBasePath || "";
  
  // Cargar header y footer e inicializar el botón después de cargar el header
  loadHTMLFragment("header", basePath + "header.html", function() {
    initializeMenuButton();
    attachSubmenuListeners();
  });
  
  loadHTMLFragment("footer", basePath + "footer.html");
});

// Función para cargar fragmentos HTML con callback
function loadHTMLFragment(id, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error " + response.status + " al cargar " + file);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // Se ejecuta el callback después de introducir el fragmento
    })
    .catch(error => console.error('Error al cargar ' + file + ':', error));
}

// Inicializa el botón hamburguesa y sus eventos
function initializeMenuButton() {
  const menuButton = document.getElementById("menu-button");
  const sidebar = document.getElementById("sidebar");
  
  if (menuButton && sidebar) { 
    // Al hacer clic en el botón se alterna la clase "active" tanto en el botón como en el menú
    menuButton.addEventListener("click", function(e) {
      e.stopPropagation();
      sidebar.classList.toggle("active");
      menuButton.classList.toggle("active");
    });
  }
}

// Detecta clics fuera del menú para cerrarlo
document.addEventListener("click", function(e){
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");
  
  if (sidebar && sidebar.classList.contains("active")) {
    if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
       sidebar.classList.remove("active");
       menuButton.classList.remove("active");
    }
  }
});

// Asigna el manejador a los submenús para alternar los íconos
function attachSubmenuListeners() {
  let submenuParents = document.querySelectorAll('.menu-item.has-submenu > a');
  submenuParents.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      let submenu = item.nextElementSibling;
      let icon = item.querySelector('.submenu-toggle');
      if (submenu) {
        submenu.classList.toggle('open');
        if (icon) {
          icon.classList.toggle('fa-chevron-right');
          icon.classList.toggle('fa-chevron-down');
        }
      }
    });
  });
}

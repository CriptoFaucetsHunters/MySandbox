// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function(){
  var basePath = window.fragmentBasePath || "";

  // Cargar header y footer, asegurándonos de inicializar el botón del menú después
  loadHTMLFragment("header", basePath + "header.html", function() {
    initializeMenuButton();
    attachSubmenuListeners();
  });

  loadHTMLFragment("footer", basePath + "footer.html");
});

// Carga fragmentos HTML como el header y el footer con un callback
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
      if (callback) callback(); // Ejecuta la función solo después de que el fragmento ha sido insertado
    })
    .catch(error => console.error('Error al cargar ' + file + ':', error));
}

// Inicializar el botón del menú hamburguesa solo cuando el header esté disponible
function initializeMenuButton() {
  const menuButton = document.getElementById("menu-button");
  const sidebar = document.getElementById("sidebar");

  if (menuButton && sidebar) { 
    menuButton.addEventListener("click", function() {
      sidebar.classList.toggle("active");
      menuButton.classList.toggle("active"); // Aplica el cambio visual en el botón
    });
  }
}

// Detectar clics fuera del menú para cerrarlo
document.addEventListener("click", function(e){
  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menu-button");

  if (sidebar && sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      !menuButton.contains(e.target)) {
    sidebar.classList.remove("active");
    menuButton.classList.remove("active"); // Restaurar el botón hamburguesa al estado original
  }
});

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

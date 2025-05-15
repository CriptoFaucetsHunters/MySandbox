document.addEventListener("DOMContentLoaded", function() {
    var basePath = window.fragmentBasePath || "";
    const inicioCarga = document.createElement("p");
    inicioCarga.textContent = "Inicio de la carga del script...";
    document.body.appendChild(inicioCarga);

    fetch(basePath + "header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error " + response.status + " al cargar header.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header").innerHTML = data;
            const headerCargado = document.createElement("p");
            headerCargado.textContent = "Header cargado. Inicializando menú...";
            document.body.appendChild(headerCargado);
            initializeMenuButton(); // Llamamos a la función aquí
            attachSubmenuListeners();
        })
        .catch(error => {
            const errorCarga = document.createElement("p");
            errorCarga.textContent = "Error al cargar el header: " + error.message;
            document.body.appendChild(errorCarga);
            console.error('Error al cargar header.html:', error);
        });

    loadHTMLFragment("footer", basePath + "footer.html");
});

function initializeMenuButton() {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const mensajeElemento = document.createElement("p");
    mensajeElemento.textContent = menuButton ? "¡Botón del menú encontrado!" : "¡Botón del menú NO encontrado!";
    document.body.appendChild(mensajeElemento);

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", function(e) {
            e.stopPropagation();
            sidebar.classList.toggle("active");
            menuButton.classList.toggle("active");
        });
    }
}

document.addEventListener("click", function(e) {
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menu-button");

    if (sidebar && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
            sidebar.classList.remove("active");
            menuButton.classList.remove("active");
            closeAllSubmenus();
        }
    }
});

function attachSubmenuListeners() {
    const submenuParents = document.querySelectorAll('.menu-item.has-submenu > a');

    submenuParents.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            const icon = this.querySelector('.submenu-toggle');
            const isOpen = submenu.classList.contains('open');

            closeAllSubmenus(submenu);

            submenu.classList.toggle('open');
            if (icon) {
                icon.classList.toggle('open');
            }
        });
    });
}

function closeAllSubmenus(currentSubmenu = null) {
    const submenus = document.querySelectorAll('.submenu.open');
    const toggles = document.querySelectorAll('.submenu-toggle.open');

    submenus.forEach(submenu => {
        if (submenu !== currentSubmenu) {
            submenu.classList.remove('open');
        }
    });

    toggles.forEach(toggle => {
        if (!toggle.parentNode.nextElementSibling || toggle.parentNode.nextElementSibling !== currentSubmenu) {
            toggle.classList.remove('open');
        }
    });
}

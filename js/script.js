document.addEventListener("DOMContentLoaded", function() {
    initializeMenuButton();
    attachSubmenuListeners();
});

function initializeMenuButton() {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const closeMenuButton = document.getElementById("close-menu-button"); // Obtener el botón de cerrar

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", function(e) {
            e.stopPropagation();
            sidebar.classList.toggle("active");
            menuButton.classList.toggle("active");
        });
    }

    // Agregar evento de clic al botón de cerrar
    if (closeMenuButton) {
        closeMenuButton.addEventListener("click", function(e) {
            e.stopPropagation();
            sidebar.classList.remove("active");
            menuButton.classList.remove("active");
            closeAllSubmenus(); // Cerrar submenús al cerrar el menú principal
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

            closeAllSubmenus(submenu); // Cerrar otros submenús
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

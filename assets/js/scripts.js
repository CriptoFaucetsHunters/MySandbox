// Mostrar/ocultar el menú al hacer clic en el botón hamburguesa
document.querySelector('.menu-toggle').addEventListener('click', function () {
  const menu = document.querySelector('.main-navigation ul');
  menu.classList.toggle('active');
});

// Ocultar el menú cuando se hace clic fuera de él
document.addEventListener('click', function (event) {
  const menu = document.querySelector('.main-navigation ul');
  const menuToggle = document.querySelector('.menu-toggle');

  // Verificar si el clic ocurrió fuera del menú y del botón hamburguesa
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.remove('active');
  }
});

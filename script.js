// script.js

function loadHTMLFile(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            // Forzamos un redibujado para que el sticky funcione bien
            window.getComputedStyle(document.body).display;
        })
        .catch(error => console.error('Error al cargar:', error));
}

loadHTMLFile('header-placeholder', 'header.html');
loadHTMLFile('footer-placeholder', 'footer.html');

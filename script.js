// script.js

function loadHTMLFile(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar:', error));
}

// Cargamos solo el footer
loadHTMLFile('footer-placeholder', 'footer.html');

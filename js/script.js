/**
 * script.js - Lógica centralizada para Cripto Faucets Hunters
 * Aquí se agregan todos los scripts del sitio en orden.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. MENÚ HAMBURGUESA (Navegación móvil)
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        // Abrir/cerrar al tocar hamburguesa
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
        
        // Cerrar al tocar fuera del menú
        document.addEventListener('click', function(e) {
            const isMenuOpen = navMenu.classList.contains('active');
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickHamburger = hamburger.contains(e.target);
            if (isMenuOpen && !isClickInsideMenu && !isClickHamburger) {
                navMenu.classList.remove('active');
            }
        });
        
        // Cerrar al tocar un enlace del menú
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. BOTÓN "VOLVER AL INICIO" (Scroll to Top)
    // ==========================================
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollBtn) {
        let hideTimeout;
        
        // Mostrar/ocultar según posición de scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const showThreshold = window.innerHeight * 0.5; // Aparece al 50% de bajada
            
            if (scrollPosition > showThreshold) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
            
            // Reiniciar temporizador de auto-ocultamiento
            clearTimeout(hideTimeout);
            if (scrollBtn.classList.contains('visible')) {
                hideTimeout = setTimeout(function() {
                    scrollBtn.classList.remove('visible');
                }, 3000); // Desaparece tras 3s de inactividad
            }
        }, { passive: true }); // 'passive' mejora rendimiento en móvil
        
        // Acción: subir suavemente al inicio
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // En móvil: tocar la pantalla reinicia el temporizador
        document.addEventListener('touchstart', function() {
            clearTimeout(hideTimeout);
            if (scrollBtn.classList.contains('visible')) {
                hideTimeout = setTimeout(function() {
                    scrollBtn.classList.remove('visible');
                }, 3000);
            }
        }, { passive: true });
    }

    // ==========================================
    // 3. ESPACIO PARA FUTUROS SCRIPTS
    // ==========================================
    // Aquí podrás agregar nuevos módulos sin tocar el HTML.
    // Ejemplo: validación de formularios, galerías, analytics, etc.
    
});

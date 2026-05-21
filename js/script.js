/**
 * script.js - Lógica centralizada para Cripto Faucets Hunters
 * Controla: Menú hamburguesa + Botón subir + futuros módulos
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. MENÚ HAMBURGUESA
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
    // 2. BOTÓN "VOLVER AL INICIO"
    // ==========================================
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollBtn) {
        let hideTimeout;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const showThreshold = window.innerHeight * 0.5;
            
            if (scrollPosition > showThreshold) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
            
            clearTimeout(hideTimeout);
            if (scrollBtn.classList.contains('visible')) {
                hideTimeout = setTimeout(function() {
                    scrollBtn.classList.remove('visible');
                }, 3000);
            }
        }, { passive: true });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
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
    
});

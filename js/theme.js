// theme.js

let isDarkMode = localStorage.getItem('theme') === 'dark';

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Appliquer le thème initial
    applyTheme(isDarkMode);
    themeToggle.checked = isDarkMode;

    // Ajouter un écouteur d'événements pour le changement de thème
    themeToggle.addEventListener('change', function() {
        isDarkMode = this.checked;
        applyTheme(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

function applyTheme(isDark) {
    document.body.classList.toggle('light', !isDark);
    document.body.classList.toggle('dark', isDark);
}

// Exposer les fonctions nécessaires globalement
window.initializeTheme = initializeTheme;
window.applyTheme = applyTheme;
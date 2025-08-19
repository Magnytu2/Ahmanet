/**
 * Script pour assurer l'affichage correct des icônes Material Icons Two-Tone
 * avec la couleur dynamique sur toutes les pages de l'administration
 */
(function() {
    'use strict';

    // Fonction pour appliquer les styles aux icônes
    function applyIconStyles() {
        // Sélectionner les éléments d'icônes
        const dashboardIcon = document.querySelector('.menu-dashboard a::after');
        const quicktaskIcon = document.querySelector('.menu-quicktask a::after');
        
        // Si nous sommes sur la page d'accueil, appliquer des styles spécifiques
        if (window.location.href.includes('/administrator/index.php') && 
            (!window.location.href.includes('?') || 
             window.location.href.includes('option=com_cpanel') || 
             window.location.href.includes('view=cpanel'))) {
            
            // Appliquer des styles inline pour garantir la priorité
            if (dashboardIcon) {
                dashboardIcon.style.setProperty('color', 'var(--mdb-primary)', 'important');
                dashboardIcon.style.setProperty('fill', 'var(--mdb-primary)', 'important');
                dashboardIcon.style.setProperty('opacity', '1', 'important');
                dashboardIcon.style.setProperty('visibility', 'visible', 'important');
            }
            
            if (quicktaskIcon) {
                quicktaskIcon.style.setProperty('color', 'var(--mdb-primary)', 'important');
                quicktaskIcon.style.setProperty('fill', 'var(--mdb-primary)', 'important');
                quicktaskIcon.style.setProperty('opacity', '1', 'important');
                quicktaskIcon.style.setProperty('visibility', 'visible', 'important');
            }
            
            // Ajouter une classe au body pour cibler spécifiquement la page d'accueil
            document.body.classList.add('admin-home');
        }
    }

    // Appliquer les styles immédiatement
    applyIconStyles();
    
    // Appliquer les styles après le chargement du DOM
    document.addEventListener('DOMContentLoaded', applyIconStyles);
    
    // Appliquer les styles après le chargement complet de la page
    window.addEventListener('load', applyIconStyles);
    
    // Appliquer les styles après un court délai pour s'assurer que tout est chargé
    setTimeout(applyIconStyles, 500);
})();

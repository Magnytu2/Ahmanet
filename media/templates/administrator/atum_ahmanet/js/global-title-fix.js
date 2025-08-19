/**
 * Script pour appliquer la couleur du texte sur tous les titres de l'administration
 * Ce script s'applique globalement à toutes les pages de l'administration
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer la valeur d'une variable CSS
    function getCssVariable(variable) {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    }

    // Récupérer la couleur du texte depuis les variables CSS
    const textColor = getCssVariable('--text-dark');
    
    // Appliquer la couleur à tous les titres et éléments de texte importants
    function applyTextColor() {
        console.log('Applying text color:', textColor);
        
        // Liste des sélecteurs à cibler
        const selectors = [
            '.container-title',
            '.page-title',
            '#content h1',
            '#content h2',
            '#content h3',
            '#content h4',
            '#content h5',
            '#content h6',
            '#content .card-header',
            '#content .card-title',
            '.cpanel-title',
            '.cpanel-modules .card-header',
            '.cpanel-modules .card-title',
            '.cpanel-modules button span',
            '.cpanel-add-module span'
        ];
        
        // Appliquer la couleur à chaque sélecteur
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.setProperty('color', textColor, 'important');
                
                // Appliquer également aux éléments enfants
                const children = element.querySelectorAll('*');
                children.forEach(child => {
                    child.style.setProperty('color', textColor, 'important');
                });
            });
        });
    }
    
    // Appliquer immédiatement
    applyTextColor();
    
    // Réappliquer après un court délai pour capturer les éléments chargés dynamiquement
    setTimeout(applyTextColor, 100);
    setTimeout(applyTextColor, 500);
    setTimeout(applyTextColor, 1000);
    
    // Observer les changements dans le DOM pour réappliquer si nécessaire
    const observer = new MutationObserver(function(mutations) {
        applyTextColor();
    });
    
    // Observer les changements dans le contenu principal
    const contentElement = document.getElementById('content');
    if (contentElement) {
        observer.observe(contentElement, { 
            childList: true, 
            subtree: true 
        });
    }
});

/**
 * Script pour remplacer les icônes Joomla par des icônes Material Design Two Tone
 * Version optimisée pour fonctionner sur toutes les pages et avec AJAX
 */

// Fonction principale pour remplacer les icônes
function replaceIconsGlobally() {
    // Remplacer les icônes plus
    const plusIcons = document.querySelectorAll('.icon-plus:not([data-replaced="true"])');
    
    plusIcons.forEach(function(icon) {
        // Créer l'élément Material Icons
        const materialIcon = document.createElement('span');
        materialIcon.className = 'material-icons-two-tone';
        materialIcon.textContent = 'add_box';
        // Pas besoin de définir la taille ici, c'est géré par le CSS en rem
        
        // Masquer l'icône originale sans la supprimer
        icon.style.display = 'none';
        
        // Insérer l'icône Material Design après l'icône originale
        icon.parentNode.insertBefore(materialIcon, icon.nextSibling);
        
        // Marquer l'icône comme remplacée
        icon.setAttribute('data-replaced', 'true');
    });
}

// Exécuter au chargement initial
document.addEventListener('DOMContentLoaded', function() {
    replaceIconsGlobally();
    
    // Observer les changements DOM pour les icônes ajoutées dynamiquement
    const observer = new MutationObserver(function(mutations) {
        let shouldReplace = false;
        
        for (let i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length > 0) {
                shouldReplace = true;
                break;
            }
        }
        
        if (shouldReplace) {
            replaceIconsGlobally();
        }
    });
    
    // Observer le corps du document avec une configuration optimisée
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: false,
        characterData: false
    });
});

// Gérer les chargements AJAX
document.addEventListener('joomla:updated', replaceIconsGlobally);

// Exécuter périodiquement pour s'assurer que toutes les icônes sont remplacées
setInterval(replaceIconsGlobally, 2000);

// Exécuter immédiatement au cas où le DOM est déjà chargé
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    replaceIconsGlobally();
}

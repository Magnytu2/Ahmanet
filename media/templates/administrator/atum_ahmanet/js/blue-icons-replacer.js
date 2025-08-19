/**
 * Script pour remplacer les icônes Joomla par des icônes Material Design Two Tone en bleu
 * Version optimisée pour fonctionner sur toutes les pages et avec AJAX
 */

// Fonction principale pour remplacer les icônes
function replaceIconsWithBlue() {
    // Récupérer la couleur primaire depuis les variables CSS
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--mdb-primary').trim();
    
    // Remplacer les icônes plus
    const plusIcons = document.querySelectorAll('.icon-plus:not([data-replaced="true"])');
    
    plusIcons.forEach(function(icon) {
        // Créer l'élément Material Icons
        const materialIcon = document.createElement('span');
        materialIcon.className = 'material-icons-two-tone';
        materialIcon.textContent = 'add_box';
        materialIcon.style.color = primaryColor;
        
        // Masquer l'icône originale sans la supprimer
        icon.style.display = 'none';
        
        // Insérer l'icône Material Design après l'icône originale
        icon.parentNode.insertBefore(materialIcon, icon.nextSibling);
        
        // Marquer l'icône comme remplacée
        icon.setAttribute('data-replaced', 'true');
    });
    
    // Remplacer d'autres icônes courantes
    const iconMappings = {
        'icon-edit': 'edit',
        'icon-trash': 'delete',
        'icon-publish': 'check_circle',
        'icon-unpublish': 'cancel',
        'icon-save': 'save',
        'icon-cancel': 'close',
        'icon-options': 'settings',
        'icon-featured': 'star',
        'icon-unfeatured': 'star_border',
        'icon-archive': 'archive',
        'icon-checkin': 'lock_open',
        'icon-lock': 'lock',
        'icon-search': 'search'
    };
    
    // Appliquer les remplacements pour chaque type d'icône
    Object.keys(iconMappings).forEach(function(iconClass) {
        const icons = document.querySelectorAll('.' + iconClass + ':not([data-replaced="true"])');
        
        icons.forEach(function(icon) {
            // Créer l'élément Material Icons
            const materialIcon = document.createElement('span');
            materialIcon.className = 'material-icons-two-tone';
            materialIcon.textContent = iconMappings[iconClass];
            materialIcon.style.color = primaryColor;
            
            // Masquer l'icône originale sans la supprimer
            icon.style.display = 'none';
            
            // Insérer l'icône Material Design après l'icône originale
            icon.parentNode.insertBefore(materialIcon, icon.nextSibling);
            
            // Marquer l'icône comme remplacée
            icon.setAttribute('data-replaced', 'true');
        });
    });
}

// Exécuter au chargement initial
document.addEventListener('DOMContentLoaded', function() {
    replaceIconsWithBlue();
    
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
            replaceIconsWithBlue();
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
document.addEventListener('joomla:updated', replaceIconsWithBlue);

// Exécuter périodiquement pour s'assurer que toutes les icônes sont remplacées
setInterval(replaceIconsWithBlue, 2000);

// Exécuter immédiatement au cas où le DOM est déjà chargé
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    replaceIconsWithBlue();
}

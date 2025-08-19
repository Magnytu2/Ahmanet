/**
 * Script pour remplacer toutes les icônes FontAwesome par des icônes Material Design Two Tone
 * Version optimisée pour fonctionner sur toutes les pages et avec AJAX
 */

// Importer le mapping des icônes
// Remarque: Le mapping est défini directement ici pour éviter les problèmes de chargement
const iconMapping = {
    // Navigation et actions
    'icon-plus': 'add_box',
    'icon-minus': 'remove',
    'icon-pencil': 'edit',
    'icon-pencil-2': 'edit',
    'icon-edit': 'edit',
    'icon-trash': 'delete',
    'icon-delete': 'delete',
    'icon-remove': 'delete',
    'icon-search': 'search',
    'icon-search-plus': 'zoom_in',
    'icon-search-minus': 'zoom_out',
    'icon-eye': 'visibility',
    'icon-eye-open': 'visibility',
    'icon-eye-close': 'visibility_off',
    'icon-save': 'save',
    'icon-ok': 'check',
    'icon-success': 'check_circle',
    'icon-cancel': 'cancel',
    'icon-times': 'close',
    'icon-close': 'close',
    'icon-download': 'download',
    'icon-upload': 'upload',
    'icon-arrow-up': 'arrow_upward',
    'icon-arrow-down': 'arrow_downward',
    'icon-arrow-left': 'arrow_back',
    'icon-arrow-right': 'arrow_forward',
    'icon-chevron-up': 'expand_less',
    'icon-chevron-down': 'expand_more',
    'icon-chevron-left': 'chevron_left',
    'icon-chevron-right': 'chevron_right',
    'icon-menu': 'menu',
    'icon-options': 'settings',
    'icon-cog': 'settings',
    'icon-gear': 'settings',
    'icon-wrench': 'build',
    'icon-tools': 'build',
    'icon-refresh': 'refresh',
    'icon-redo': 'redo',
    'icon-undo': 'undo',
    'icon-power-off': 'power_settings_new',
    'icon-off': 'power_settings_new',
    'icon-home': 'home',
    'icon-house': 'home',
    'icon-star': 'star',
    'icon-star-empty': 'star_border',
    'icon-heart': 'favorite',
    'icon-heart-empty': 'favorite_border',
    'icon-thumbs-up': 'thumb_up',
    'icon-thumbs-down': 'thumb_down',
    'icon-flag': 'flag',
    'icon-warning': 'warning',
    'icon-notice': 'info',
    'icon-info': 'info',
    'icon-question': 'help',
    'icon-help': 'help',
    'icon-exclamation-sign': 'error',
    'icon-error': 'error',
    'icon-clock': 'access_time',
    'icon-time': 'access_time',
    'icon-calendar': 'calendar_today',
    'icon-date': 'date_range',
    'icon-print': 'print',
    'icon-mail': 'email',
    'icon-envelope': 'email',
    'icon-phone': 'phone',
    'icon-comment': 'comment',
    'icon-comments': 'chat',
    'icon-user': 'person',
    'icon-users': 'people',
    'icon-group': 'people',
    'icon-lock': 'lock',
    'icon-unlock': 'lock_open',
    'icon-key': 'vpn_key',
    'icon-tag': 'local_offer',
    'icon-tags': 'local_offer',
    'icon-bookmark': 'bookmark',
    'icon-book': 'book',
    'icon-file': 'description',
    'icon-copy': 'file_copy',
    'icon-folder': 'folder',
    'icon-folder-open': 'folder_open',
    'icon-picture': 'image',
    'icon-image': 'image',
    'icon-camera': 'camera_alt',
    'icon-video': 'videocam',
    'icon-music': 'music_note',
    'icon-play': 'play_arrow',
    'icon-pause': 'pause',
    'icon-stop': 'stop',
    'icon-next': 'skip_next',
    'icon-previous': 'skip_previous',
    'icon-fast-forward': 'fast_forward',
    'icon-fast-backward': 'fast_rewind',
    'icon-volume-up': 'volume_up',
    'icon-volume-down': 'volume_down',
    'icon-volume-off': 'volume_off',
    'icon-volume-mute': 'volume_mute',
    'icon-share': 'share',
    'icon-share-alt': 'share',
    'icon-link': 'link',
    'icon-unlink': 'link_off',
    'icon-globe': 'public',
    'icon-world': 'public',
    'icon-map-marker': 'place',
    'icon-location': 'place',
    'icon-dashboard': 'dashboard',
    'icon-list': 'list',
    'icon-list-view': 'view_list',
    'icon-grid-view': 'grid_view',
    'icon-grid': 'grid_view',
    'icon-th': 'grid_view',
    'icon-th-list': 'view_list',
    'icon-filter': 'filter_list',
    'icon-sort': 'sort',
    'icon-sort-up': 'arrow_upward',
    'icon-sort-down': 'arrow_downward',
    'icon-check': 'check',
    'icon-checkbox': 'check_box',
    'icon-checkbox-unchecked': 'check_box_outline_blank',
    'icon-checkbox-partial': 'indeterminate_check_box',
    'icon-radio-checked': 'radio_button_checked',
    'icon-radio-unchecked': 'radio_button_unchecked',
    'icon-bars': 'menu',
    'icon-menu-3': 'menu',
    'icon-publish': 'publish',
    'icon-unpublish': 'unpublished',
    'icon-archive': 'archive',
    'icon-unarchive': 'unarchive',
    'icon-featured': 'star',
    'icon-unfeatured': 'star_border',
    'icon-pending': 'pending',
    'icon-expired': 'timer_off',
    'icon-checkin': 'check_circle',
    'icon-checkout': 'logout',
    'icon-signup': 'person_add',
    'icon-signin': 'login',
    'icon-logout': 'logout',
    'icon-login': 'login',
    'icon-apply': 'done',
    'icon-save-new': 'save_as',
    'icon-save-copy': 'file_copy',
    'icon-save-close': 'save',
    'icon-cancel-2': 'cancel',
    'icon-joomla': 'extension',
    'icon-module': 'widgets',
    'icon-plugin': 'extension',
    'icon-component': 'view_quilt'
};

/**
 * Fonction principale pour remplacer les icônes
 */
function replaceAllIcons() {
    // Sélectionner toutes les classes qui commencent par "icon-" et qui n'ont pas été remplacées
    const iconElements = document.querySelectorAll('[class*="icon-"]:not([data-replaced="true"])');
    
    iconElements.forEach(function(element) {
        // Obtenir toutes les classes de l'élément
        const classes = element.className.split(' ');
        
        // Rechercher les classes qui commencent par "icon-"
        for (let i = 0; i < classes.length; i++) {
            const iconClass = classes[i];
            
            if (iconClass.startsWith('icon-') && iconMapping[iconClass]) {
                // Créer l'élément Material Icons
                const materialIcon = document.createElement('span');
                materialIcon.className = 'material-icons-two-tone';
                materialIcon.textContent = iconMapping[iconClass];
                
                // Masquer l'icône originale sans la supprimer
                element.style.display = 'none';
                
                // Insérer l'icône Material Design après l'icône originale
                element.parentNode.insertBefore(materialIcon, element.nextSibling);
                
                // Marquer l'élément comme remplacé
                element.setAttribute('data-replaced', 'true');
                
                // Sortir de la boucle une fois qu'une icône a été remplacée
                break;
            }
        }
    });
}

/**
 * Fonction pour remplacer les icônes dans les éléments nouvellement ajoutés
 */
function observeDOMChanges() {
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
            replaceAllIcons();
        }
    });
    
    // Observer le corps du document avec une configuration optimisée
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: false,
        characterData: false
    });
}

// Exécuter au chargement initial
document.addEventListener('DOMContentLoaded', function() {
    replaceAllIcons();
    observeDOMChanges();
});

// Gérer les chargements AJAX
document.addEventListener('joomla:updated', replaceAllIcons);

// Exécuter périodiquement pour s'assurer que toutes les icônes sont remplacées
setInterval(replaceAllIcons, 2000);

// Exécuter immédiatement au cas où le DOM est déjà chargé
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    replaceAllIcons();
}

/**
 * Script optimisé pour appliquer les styles MDBootstrap à la sidebar Joomla
 * Version simplifiée avec une meilleure détection de la page principale
 */

// Exécution immédiate pour appliquer les styles dès que possible
(function() {
    // Constantes pour les couleurs MDBootstrap
    const PRIMARY_COLOR = '#3B71CA';
    const TEXT_COLOR = '#FFFFFF';
    const BOX_SHADOW = '0 2px 5px 0 rgba(59, 113, 202, 0.2), 0 2px 10px 0 rgba(59, 113, 202, 0.1)';
    // Convertir la couleur hexadécimale en RGB pour les ombres
    const PRIMARY_COLOR_RGB = '59, 113, 202';
    
    /**
     * Applique les styles d'élément actif à un élément
     */
    function applyActiveStyle(element) {
        if (!element) return;
        
        element.style.backgroundColor = PRIMARY_COLOR;
        element.style.color = TEXT_COLOR;
        element.style.boxShadow = BOX_SHADOW;
        
        // Forcer le style avec setAttribute pour contourner les problèmes de spécificité CSS
        element.setAttribute('style', `background-color: ${PRIMARY_COLOR} !important; color: ${TEXT_COLOR} !important; box-shadow: ${BOX_SHADOW} !important;`);
        
        // Appliquer les styles aux icônes à l'intérieur
        const icons = element.querySelectorAll('[class^="icon-"], [class*=" icon-"]');
        icons.forEach(function(icon) {
            icon.style.color = TEXT_COLOR;
            icon.setAttribute('style', `color: ${TEXT_COLOR} !important;`);
        });
        
        // Appliquer les styles aux titres à l'intérieur
        const titles = element.querySelectorAll('.sidebar-item-title');
        titles.forEach(function(title) {
            title.style.color = TEXT_COLOR;
            title.setAttribute('style', `color: ${TEXT_COLOR} !important;`);
        });
    }
    
    // Fonction pour vérifier si nous sommes sur la page principale d'administration
    function isMainAdminPage() {
        // Vérifier l'URL
        const url = window.location.href;
        if (url.includes('option=com_cpanel') || 
            url.includes('view=cpanel') || 
            url === '/administrator/' || 
            url === '/administrator/index.php' || 
            url.endsWith('/administrator/') || 
            url.endsWith('/administrator/index.php')) {
            return true;
        }
        
        // Vérifier les classes du body
        if (document.body.classList.contains('com_cpanel') || 
            document.body.classList.contains('view-cpanel') || 
            document.body.classList.contains('task-')) {
            return true;
        }
        
        // Vérifier les éléments spécifiques
        if (document.querySelector('.com_cpanel') !== null || 
            document.querySelector('.view-cpanel') !== null) {
            return true;
        }
        
        return false;
    }
    
    // Fonction pour styler les liens spécifiques
    function styleSpecificLinks() {
        const activeItems = document.querySelectorAll('.active, .current');
        activeItems.forEach(function(item) {
            const links = item.querySelectorAll('a');
            links.forEach(function(link) {
                applyActiveStyle(link);
            });
            
            // Cibler les icônes dans les éléments actifs
            const icons = item.querySelectorAll('[class^="icon-"], [class*=" icon-"]');
            icons.forEach(function(icon) {
                icon.style.color = TEXT_COLOR;
                icon.setAttribute('style', `color: ${TEXT_COLOR} !important;`);
            });
            
            // Cibler les titres dans les éléments actifs
            const titles = item.querySelectorAll('.sidebar-item-title');
            titles.forEach(function(title) {
                title.style.color = TEXT_COLOR;
                title.setAttribute('style', `color: ${TEXT_COLOR} !important;`);
            });
        });
        
        // Cibler les icônes du dashboard
        const dashboardIcons = document.querySelectorAll('.quickicon-icon, .quickicon-icon-overlay');
        dashboardIcons.forEach(function(icon) {
            icon.style.backgroundColor = PRIMARY_COLOR;
            icon.style.color = TEXT_COLOR;
            icon.style.borderColor = PRIMARY_COLOR;
        });
    }
    
    // Fonction pour styler les éléments de navigation principaux
    function styleMainNavItems() {
        const sidebarItems = document.querySelectorAll('#sidebar-wrapper .main-nav > li, #sidebar-wrapper .main-nav-container > ul > li');
        
        if (sidebarItems.length > 0) {
            const firstItem = sidebarItems[0];
            const firstItemLink = firstItem.querySelector('a');
            
            if (firstItemLink) {
                applyActiveStyle(firstItemLink);
                firstItem.classList.add('active', 'current');
            }
        }
    }
    
    // Fonction pour styler les menus numérotés de Joomla
    function styleJoomlaMenus() {
        ['#menu1', '#menu2', '#menu3', '#menu4', '#menu5'].forEach(menuId => {
            const menu = document.querySelector(menuId);
            if (menu) {
                const firstMenuItem = menu.querySelector('li:first-child');
                if (firstMenuItem) {
                    const link = firstMenuItem.querySelector('a');
                    if (link) {
                        applyActiveStyle(link);
                        firstMenuItem.classList.add('active', 'current');
                    }
                }
            }
        });
    }
    
    // Fonction principale pour appliquer les styles à la sidebar
    function applyMainPageStyles() {
        // Vérifier si nous sommes sur la page principale
        if (!isMainAdminPage()) {
            return;
        }
        
        // Ajouter la classe pour les sélecteurs CSS
        document.body.classList.add('admin-homepage');
        
        // Appliquer les styles aux éléments de menu
        styleMainNavItems();
        styleJoomlaMenus();
        styleSpecificLinks();
    }
    
    // Exécution immédiate
    applyMainPageStyles();
    
    // Exécution après DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM chargé - application des styles');
        applyMainPageStyles();
        
        // Exécution après un court délai
        setTimeout(applyMainPageStyles, 500);
        
        // Exécution après un délai plus long pour s'assurer que tout est chargé
        setTimeout(applyMainPageStyles, 1500);
    });
    
    // Exécution après le chargement complet de la page
    window.addEventListener('load', function() {
        console.log('Page chargée - application des styles');
        applyMainPageStyles();
        
        // Exécution après un délai pour s'assurer que tous les scripts sont chargés
        setTimeout(applyMainPageStyles, 1000);
        
        // Observer les changements dans le DOM pour réappliquer les styles si nécessaire
        if (window.MutationObserver) {
            const observer = new MutationObserver(function(mutations) {
                console.log('Mutations détectées - réapplication des styles');
                applyMainPageStyles();
            });
            
            // Observer les changements dans le corps du document
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        }
    });
    
    // Exécution périodique pour s'assurer que les styles sont maintenus
    setInterval(applyMainPageStyles, 2000);
    
    // Observer les mutations du DOM pour réappliquer les styles lorsque la structure change
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            console.log('Mutation du DOM détectée - réapplication des styles');
            applyMainPageStyles();
        });
        
        // Observer les changements dans le sidebar
        const sidebar = document.getElementById('sidebar-wrapper');
        if (sidebar) {
            observer.observe(sidebar, { childList: true, subtree: true });
            console.log('Observateur de sidebar attaché');
        }
    }
})();

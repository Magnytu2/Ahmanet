/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum_Ahmanet
 *
 * @copyright   (C) 2023 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

(function() {
    'use strict';
    
    // Configuration
    const config = {
        primaryColor: '#3B71CA',
        primaryShadow: '0 2px 5px 0 rgba(59, 113, 202, 0.2), 0 2px 10px 0 rgba(59, 113, 202, 0.1)',
        checkInterval: 1000,      // Intervalle de vérification périodique en ms
        initialDelay: 100,        // Délai initial après chargement en ms
        logEnabled: true,         // Activer les logs pour le débogage
        // Patterns plus génériques pour détecter toutes les pages d'administration
        adminUrlPatterns: ['/administrator/index.php', '/administrator/'],
        // Patterns spécifiques pour la page d'accueil
        homePageUrlPatterns: ['option=com_cpanel', 'view=cpanel', '/administrator/index.php?option=', '/administrator/index.php$'],
        homePageBodyClasses: ['com_cpanel', 'task-display', 'view-cpanel', 'admin-homepage', 'view-display'],
        homePageElements: ['#cpanel-modules', '.cpanel-modules', '.admin-dashboard', '#system-message-container']
    };
    
    // Cache des éléments DOM fréquemment utilisés
    const domCache = {
        body: document.body,
        sidebar: null,
        firstMenuItem: null,
        dashboardLinks: null
    };
    
    /**
     * Logger personnalisé
     */
    const logger = {
        log: function(message) {
            if (config.logEnabled) console.log('Atum Ahmanet: ' + message);
        },
        error: function(message, error) {
            if (config.logEnabled) console.error('Atum Ahmanet: ' + message, error);
        }
    };
    
    /**
     * Détecte si nous sommes sur une page d'administration
     * @return {boolean} True si nous sommes sur une page d'administration
     */
    function isAdminPage() {
        const currentUrl = window.location.href;
        const urlMatch = config.adminUrlPatterns.some(pattern => currentUrl.includes(pattern));
        
        if (urlMatch) {
            logger.log('Page d\'administration détectée');
            return true;
        }
        
        return false;
    }
    
    /**
     * Détecte si nous sommes sur la page d'accueil de l'administration
     * @return {boolean} True si nous sommes sur la page d'accueil
     */
    function isHomePage() {
        // Vérifier l'URL
        const currentUrl = window.location.href;
        
        // Vérifier si c'est la page principale sans paramètres
        if (currentUrl.match(/\/administrator\/?$/) || 
            currentUrl.match(/\/administrator\/index\.php$/) ||
            currentUrl.match(/\/administrator\/index\.php\?$/)) {
            logger.log('Page d\'accueil détectée (URL principale)');
            return true;
        }
        
        // Vérifier les patterns d'URL
        const urlMatch = config.homePageUrlPatterns.some(pattern => currentUrl.includes(pattern));
        if (urlMatch) {
            logger.log('Page d\'accueil détectée par URL pattern');
            return true;
        }
        
        // Vérifier les classes du body
        if (domCache.body) {
            const bodyMatch = config.homePageBodyClasses.some(className => 
                domCache.body.classList.contains(className)
            );
            
            if (bodyMatch) {
                logger.log('Page d\'accueil détectée par classes body');
                return true;
            }
        }
        
        // Vérifier la présence d'éléments spécifiques à la page d'accueil
        const elementsMatch = config.homePageElements.some(selector => 
            document.querySelector(selector)
        );
        
        if (elementsMatch) {
            logger.log('Page d\'accueil détectée par éléments spécifiques');
            return true;
        }
        
        return false;
    }
    
    /**
     * Initialise le cache DOM pour éviter les requêtes répétées
     */
    function initDomCache() {
        if (!domCache.sidebar) {
            domCache.sidebar = document.querySelector('#sidebar-wrapper');
        }
        
        if (domCache.sidebar && !domCache.firstMenuItem) {
            domCache.firstMenuItem = domCache.sidebar.querySelector(
                '.main-nav .item:first-child, .sidebar-nav .item:first-child, ' + 
                '.main-nav .nav-item:first-child, .sidebar-nav .nav-item:first-child'
            );
        }
        
        if (domCache.sidebar && !domCache.dashboardLinks) {
            domCache.dashboardLinks = domCache.sidebar.querySelectorAll(
                'a[href*="option=com_cpanel"], a[href*="view=cpanel"], a[href="index.php"]'
            );
        }
    }
    
    /**
     * Applique les styles à un élément
     * @param {Element} element - L'élément à styliser
     */
    function applyElementStyles(element) {
        if (!element) return;
        
        // Éviter d'appliquer les styles plusieurs fois
        if (element.dataset.styledByAtumAhmanet === 'true') return;
        
        element.style.backgroundColor = config.primaryColor;
        element.style.color = '#fff';
        element.style.boxShadow = config.primaryShadow;
        element.dataset.styledByAtumAhmanet = 'true';
        
        // Appliquer les styles aux icônes
        const icons = element.querySelectorAll('[class^="icon-"], [class*=" icon-"]');
        icons.forEach(icon => {
            icon.style.color = '#fff';
        });
        
        // Appliquer les styles aux titres
        const titles = element.querySelectorAll('.sidebar-item-title');
        titles.forEach(title => {
            title.style.color = '#fff';
        });
    }
    
    /**
     * Applique les styles à la sidebar sur toutes les pages d'administration
     */
    function applyAdminPageStyles() {
        // Initialiser le cache DOM
        initDomCache();
        
        // Si la sidebar n'est pas trouvée, sortir
        if (!domCache.sidebar) {
            logger.log('Sidebar non trouvée');
            return;
        }
        
        logger.log('Application des styles à la sidebar (page admin)');
        
        // Appliquer les styles aux éléments actifs
        const activeElements = domCache.sidebar.querySelectorAll('.item.active > a, .item.current > a, .nav-item.active > a, .nav-item.current > a');
        if (activeElements.length > 0) {
            logger.log(`${activeElements.length} éléments actifs trouvés`);
            activeElements.forEach(applyElementStyles);
        }
    }
    
    /**
     * Applique les styles à la page principale
     */
    function applyHomePageStyles() {
        // Ajouter la classe au body
        if (domCache.body && !domCache.body.classList.contains('admin-homepage')) {
            domCache.body.classList.add('admin-homepage');
        }
        
        // Initialiser le cache DOM
        initDomCache();
        
        // Si la sidebar n'est pas trouvée, sortir
        if (!domCache.sidebar) {
            logger.log('Sidebar non trouvée');
            return;
        }
        
        logger.log('Application des styles à la sidebar (page d\'accueil)');
        
        // Appliquer les styles au premier élément de menu
        if (domCache.firstMenuItem) {
            logger.log('Premier élément de menu trouvé');
            
            // Ajouter les classes active et current
            domCache.firstMenuItem.classList.add('active', 'current');
            
            // Appliquer les styles aux liens
            const firstMenuLinks = domCache.firstMenuItem.querySelectorAll('a, .sidebar-item-title-wrapper');
            firstMenuLinks.forEach(applyElementStyles);
        }
        
        // Appliquer les styles aux liens du tableau de bord
        if (domCache.dashboardLinks && domCache.dashboardLinks.length > 0) {
            logger.log(`${domCache.dashboardLinks.length} liens de tableau de bord trouvés`);
            domCache.dashboardLinks.forEach(applyElementStyles);
        }
        
        // Appliquer les styles aux éléments actifs
        const activeElements = domCache.sidebar.querySelectorAll('.item.active > a, .item.current > a, .nav-item.active > a, .nav-item.current > a');
        if (activeElements.length > 0) {
            logger.log(`${activeElements.length} éléments actifs trouvés`);
            activeElements.forEach(applyElementStyles);
        }
    }
    
    /**
     * Fonction principale qui vérifie et applique les styles si nécessaire
     */
    function checkAndApplyStyles() {
        try {
            // Vérifier si nous sommes sur une page d'administration
            if (isAdminPage()) {
                // Appliquer les styles de base pour toutes les pages d'administration
                applyAdminPageStyles();
                
                // Si c'est la page d'accueil, appliquer des styles spécifiques supplémentaires
                if (isHomePage()) {
                    logger.log('Page d\'accueil détectée, application des styles spécifiques');
                    applyHomePageStyles();
                }
                
                return true;
            }
        } catch (e) {
            logger.error('Erreur lors de l\'application des styles', e);
        }
        return false;
    }
    
    /**
     * Initialise l'observation des mutations du DOM
     */
    function initMutationObserver() {
        // Attendre que la sidebar soit disponible
        if (!domCache.sidebar) return;
        
        let debounceTimer = null;
        const observer = new MutationObserver(function() {
            // Utiliser un debounce pour éviter les appels trop fréquents
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(checkAndApplyStyles, 150);
        });
        
        // Observer les changements dans la sidebar
        observer.observe(domCache.sidebar, { childList: true, subtree: true });
        logger.log('Observateur de mutations initialisé');
    }
    
    /**
     * Initialise les écouteurs d'événements et les vérifications périodiques
     */
    function init() {
        // Exécuter immédiatement pour éviter le FOUC (Flash of Unstyled Content)
        const initialCheck = checkAndApplyStyles();
        
        // Ajouter un écouteur pour l'événement load
        window.addEventListener('load', checkAndApplyStyles);
        
        // Exécuter à nouveau après un court délai
        setTimeout(checkAndApplyStyles, config.initialDelay);
        
        // Exécuter périodiquement avec un intervalle raisonnable
        setInterval(checkAndApplyStyles, config.checkInterval);
        
        // Initialiser l'observateur de mutations
        setTimeout(initMutationObserver, config.initialDelay);
        
        // Ajouter un écouteur pour les changements d'URL (pour les SPA)
        window.addEventListener('popstate', checkAndApplyStyles);
    }
    
    // Démarrer selon l'état de chargement du document
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

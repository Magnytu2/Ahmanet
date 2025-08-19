/**
 * Script pour restaurer les couleurs correctes sur la page d'accueil de l'administration
 * Ce script détecte spécifiquement la page d'accueil et applique les styles nécessaires
 */
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        debug: true,
        applyDelay: 100,
        reapplyInterval: 1000,
        maxReapplies: 10
    };

    // Compteur pour limiter les réapplications
    let applyCount = 0;

    // Fonction de journalisation
    function log(message) {
        if (config.debug) {
            console.log('[HomepageFixer] ' + message);
        }
    }

    // Fonction pour détecter si nous sommes sur la page d'accueil
    function isHomePage() {
        // 1. Vérifier l'URL
        const url = window.location.href;
        const isHomeUrl = (
            url.includes('option=com_cpanel') || 
            url.includes('/administrator/index.php') && !url.includes('option=') ||
            url.includes('/administrator/') && !url.includes('index.php')
        );

        // 2. Vérifier la présence d'éléments spécifiques à la page d'accueil
        const hasDashboardElements = (
            document.querySelector('.cpanel-modules') !== null ||
            document.querySelector('.card-columns') !== null ||
            document.querySelector('.dashboard-card') !== null ||
            document.querySelector('.admin-dashboard') !== null
        );

        // 3. Vérifier si le menu "Home" est actif
        const isHomeMenuActive = (
            document.querySelector('.menu-dashboard.active') !== null ||
            document.querySelector('.menu-cpanel.active') !== null ||
            document.querySelector('.menu-home.active') !== null ||
            document.querySelector('a[href*="option=com_cpanel"].active') !== null
        );

        // Combiner les conditions
        const result = isHomeUrl || hasDashboardElements || isHomeMenuActive;
        log('Détection page d\'accueil: ' + (result ? 'OUI' : 'NON'));
        return result;
    }

    // Fonction pour appliquer les styles à la page d'accueil
    function applyHomePageStyles() {
        if (!isHomePage()) {
            log('Ce n\'est pas la page d\'accueil, aucun style appliqué');
            return false;
        }

        log('Application des styles pour la page d\'accueil');

        // 1. Ajouter la classe admin-homepage au body si elle n'existe pas
        if (!document.body.classList.contains('admin-homepage')) {
            document.body.classList.add('admin-homepage');
            log('Classe admin-homepage ajoutée au body');
        }

        // 2. Appliquer les styles aux cartes du tableau de bord
        const dashboardCards = document.querySelectorAll('.card, .dashboard-card, .cpanel-modules .card');
        dashboardCards.forEach((card, index) => {
            // Ajouter une bordure colorée
            card.style.borderTop = '3px solid var(--mdb-primary)';
            card.style.boxShadow = '0 2px 5px rgba(var(--mdb-primary-rgb), 0.2)';
            
            // S'assurer que le titre utilise la couleur correcte
            const cardTitle = card.querySelector('.card-title, .card-header');
            if (cardTitle) {
                cardTitle.style.color = 'var(--mdb-primary)';
            }
            
            // Appliquer des styles aux icônes
            const icons = card.querySelectorAll('.icon-wrapper, [class^="icon-"], [class*=" icon-"]');
            icons.forEach(icon => {
                icon.style.color = 'var(--mdb-primary)';
            });
        });

        // 3. Appliquer les styles aux compteurs et badges
        const badges = document.querySelectorAll('.badge, .badge-info, .badge-module, .badge-number');
        badges.forEach(badge => {
            badge.style.backgroundColor = 'var(--mdb-primary)';
            badge.style.color = '#ffffff';
        });

        // 4. Appliquer les styles aux boutons
        const buttons = document.querySelectorAll('.btn-primary, .btn-info');
        buttons.forEach(button => {
            button.style.backgroundColor = 'var(--mdb-primary)';
            button.style.borderColor = 'var(--mdb-primary)';
            button.style.color = '#ffffff';
        });

        // 5. S'assurer que le menu Home est correctement stylisé
        const homeMenuItem = document.querySelector('.menu-dashboard, .menu-cpanel, .menu-home, a[href*="option=com_cpanel"]');
        if (homeMenuItem) {
            const menuItem = homeMenuItem.closest('li') || homeMenuItem;
            menuItem.classList.add('active');
            menuItem.classList.add('current');
            
            // Styliser l'élément actif
            menuItem.style.backgroundColor = 'var(--template-bg-dark-80)';
            menuItem.style.color = 'var(--template-text-light)';
            
            // Styliser le lien et l'icône
            const link = menuItem.querySelector('a');
            if (link) {
                link.style.backgroundColor = 'var(--template-bg-dark-80)';
                link.style.color = 'var(--template-text-light)';
                
                const icon = link.querySelector('[class^="icon-"], [class*=" icon-"]');
                if (icon) {
                    icon.style.color = 'var(--template-text-light)';
                }
            }
        }

        log('Styles appliqués à la page d\'accueil');
        return true;
    }

    // Appliquer les styles après un court délai pour s'assurer que le DOM est chargé
    setTimeout(() => {
        if (applyHomePageStyles()) {
            log('Styles initiaux appliqués avec succès');
            
            // Configurer l'observateur pour détecter les changements dans le DOM
            const observer = new MutationObserver((mutations) => {
                if (applyCount < config.maxReapplies) {
                    applyCount++;
                    log(`Réapplication des styles (#${applyCount})`);
                    applyHomePageStyles();
                } else {
                    observer.disconnect();
                    log('Nombre maximum de réapplications atteint, observateur arrêté');
                }
            });
            
            // Observer les changements dans le body et ses enfants
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
            
            // Réappliquer périodiquement pour s'assurer que les styles sont maintenus
            const intervalId = setInterval(() => {
                if (applyCount < config.maxReapplies) {
                    applyCount++;
                    log(`Réapplication périodique des styles (#${applyCount})`);
                    applyHomePageStyles();
                } else {
                    clearInterval(intervalId);
                    log('Nombre maximum de réapplications atteint, intervalle arrêté');
                }
            }, config.reapplyInterval);
        }
    }, config.applyDelay);

    // Écouter les changements d'URL pour les applications SPA
    window.addEventListener('popstate', () => {
        log('Changement d\'URL détecté, vérification de la page d\'accueil');
        setTimeout(applyHomePageStyles, 100);
    });
});

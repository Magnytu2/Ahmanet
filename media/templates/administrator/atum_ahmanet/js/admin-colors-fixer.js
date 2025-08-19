/**
 * Script pour appliquer correctement les couleurs sur la page d'accueil de l'administration
 * Ce script utilise une détection robuste de la page d'accueil et applique les styles directement
 */
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        debug: true,
        applyDelay: 50,
        reapplyInterval: 500,
        maxReapplies: 20
    };

    // Compteur pour limiter les réapplications
    let applyCount = 0;

    // Fonction de journalisation
    function log(message) {
        if (config.debug) {
            console.log('[AdminColorsFixer] ' + message);
        }
    }

    // Fonction pour détecter si nous sommes sur la page d'accueil
    function isHomePage() {
        // 1. Vérifier l'URL avec des patterns plus précis
        const url = window.location.href;
        const isHomeUrl = (
            url.includes('option=com_cpanel') || 
            url.includes('/administrator/index.php') && !url.includes('option=') ||
            url.includes('/administrator/') && !url.includes('index.php') ||
            url.endsWith('/administrator/')
        );

        // 2. Vérifier les classes du body
        const bodyClasses = document.body.classList;
        const hasHomePageClass = (
            bodyClasses.contains('admin') ||
            bodyClasses.contains('admin-cpanel') ||
            bodyClasses.contains('site-cpanel') ||
            bodyClasses.contains('com_cpanel') ||
            bodyClasses.contains('view-cpanel') ||
            bodyClasses.contains('task-display') ||
            bodyClasses.contains('administrator')
        );

        // 3. Vérifier la présence d'éléments spécifiques à la page d'accueil
        const hasDashboardElements = (
            document.querySelector('.cpanel-modules') !== null ||
            document.querySelector('.card-columns') !== null ||
            document.querySelector('.dashboard-card') !== null ||
            document.querySelector('.admin-dashboard') !== null ||
            document.querySelector('.quickicon') !== null
        );

        // 4. Vérifier si le menu "Home" est actif
        const isHomeMenuActive = (
            document.querySelector('.menu-dashboard.active') !== null ||
            document.querySelector('.menu-cpanel.active') !== null ||
            document.querySelector('.menu-home.active') !== null ||
            document.querySelector('a[href*="option=com_cpanel"].active') !== null ||
            document.querySelector('a[href="index.php"].active') !== null
        );

        // Combiner les conditions
        const result = isHomeUrl || hasHomePageClass || hasDashboardElements || isHomeMenuActive;
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

        // 1. Ajouter toutes les classes possibles au body
        const classesToAdd = ['admin', 'admin-homepage'];
        classesToAdd.forEach(className => {
            if (!document.body.classList.contains(className)) {
                document.body.classList.add(className);
                log(`Classe ${className} ajoutée au body`);
            }
        });

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
                cardTitle.style.fontWeight = '500';
            }
            
            // Appliquer des styles aux icônes
            const icons = card.querySelectorAll('[class^="icon-"], [class*=" icon-"], .fa, .fas, .far, .fab');
            icons.forEach(icon => {
                icon.style.color = 'var(--mdb-primary)';
            });
        });

        // 3. Appliquer les styles aux compteurs et badges
        const badges = document.querySelectorAll('.badge, .badge-info, .badge-module, .badge-number, .system-counter');
        badges.forEach(badge => {
            badge.style.backgroundColor = 'var(--mdb-primary)';
            badge.style.color = '#ffffff';
            badge.style.border = 'none';
            badge.style.fontWeight = '500';
        });

        // 4. Appliquer les styles aux boutons
        const buttons = document.querySelectorAll('.btn-primary, .btn-info, .btn-action');
        buttons.forEach(button => {
            button.style.backgroundColor = 'var(--mdb-primary)';
            button.style.borderColor = 'var(--mdb-primary)';
            button.style.color = '#ffffff';
        });

        // 5. Quickicons: ne pas injecter de styles inline; laisser le CSS gérer les couleurs

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
        setTimeout(applyHomePageStyles, 50);
    });
});

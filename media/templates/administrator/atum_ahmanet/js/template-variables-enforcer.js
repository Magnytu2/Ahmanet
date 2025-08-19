/**
 * Script pour forcer l'application des variables CSS natives du template
 * Ce script s'assure que les variables CSS du template parent sont correctement appliquées
 * et qu'elles ne sont pas écrasées par d'autres styles
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer les variables CSS du template parent
    function getTemplateVariables() {
        const styles = getComputedStyle(document.documentElement);
        
        // Variables à surveiller et à forcer
        const variables = {
            // Variables du template parent Atum
            'template-bg-dark': styles.getPropertyValue('--template-bg-dark').trim(),
            'template-bg-dark-60': styles.getPropertyValue('--template-bg-dark-60').trim(),
            'template-bg-dark-65': styles.getPropertyValue('--template-bg-dark-65').trim(),
            'template-bg-dark-70': styles.getPropertyValue('--template-bg-dark-70').trim(),
            'template-bg-dark-75': styles.getPropertyValue('--template-bg-dark-75').trim(),
            'template-bg-dark-80': styles.getPropertyValue('--template-bg-dark-80').trim(),
            'template-bg-light': styles.getPropertyValue('--template-bg-light').trim(),
            'template-text-dark': styles.getPropertyValue('--template-text-dark').trim(),
            'template-text-light': styles.getPropertyValue('--template-text-light').trim(),
            'template-link-color': styles.getPropertyValue('--template-link-color').trim(),
            'template-special-color': styles.getPropertyValue('--template-special-color').trim(),
            
            // Variables MDBootstrap
            'mdb-primary': styles.getPropertyValue('--mdb-primary').trim(),
            'mdb-primary-rgb': styles.getPropertyValue('--mdb-primary-rgb').trim(),
            'mdb-secondary': styles.getPropertyValue('--mdb-secondary').trim(),
            'mdb-secondary-rgb': styles.getPropertyValue('--mdb-secondary-rgb').trim(),
            'mdb-success': styles.getPropertyValue('--mdb-success').trim(),
            'mdb-success-rgb': styles.getPropertyValue('--mdb-success-rgb').trim(),
            'mdb-danger': styles.getPropertyValue('--mdb-danger').trim(),
            'mdb-danger-rgb': styles.getPropertyValue('--mdb-danger-rgb').trim(),
            'mdb-warning': styles.getPropertyValue('--mdb-warning').trim(),
            'mdb-warning-rgb': styles.getPropertyValue('--mdb-warning-rgb').trim(),
            'mdb-info': styles.getPropertyValue('--mdb-info').trim(),
            'mdb-info-rgb': styles.getPropertyValue('--mdb-info-rgb').trim()
        };
        
        return variables;
    }
    
    // Fonction pour forcer l'application des variables CSS
    function enforceTemplateVariables() {
        const variables = getTemplateVariables();
        
        // Créer ou mettre à jour l'élément style pour forcer les variables
        let styleElement = document.getElementById('template-variables-enforcer');
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'template-variables-enforcer';
            document.head.appendChild(styleElement);
        }
        
        // Construire le contenu CSS
        let cssContent = ':root {\n';
        
        for (const [name, value] of Object.entries(variables)) {
            if (value) {
                cssContent += `  --${name}: ${value} !important;\n`;
            }
        }
        
        cssContent += '}\n\n';
        
        // Ajouter des règles spécifiques pour les éléments de la sidebar
        cssContent += `
/* Forcer les styles pour les éléments actifs du menu */
#sidebar-wrapper .sidebar-nav .nav-item.active > a,
#sidebar-wrapper .sidebar-nav .nav-item.active > a:hover,
#sidebar-wrapper .sidebar-nav .nav-item.active > a:focus,
#sidebar-wrapper .main-nav .item.active > a,
#sidebar-wrapper .main-nav .item.active > a:hover,
#sidebar-wrapper .main-nav .item.active > a:focus,
#sidebar-wrapper .main-nav .item.mm-active > a,
#sidebar-wrapper .main-nav .item.current > a {
    background-color: var(--template-bg-dark-80) !important;
    color: var(--template-text-light) !important;
    box-shadow: none !important;
}

/* Forcer les styles pour les sous-menus */
#sidebar-wrapper .sidebar-nav .nav-item .collapse-level-1 a,
#sidebar-wrapper .main-nav .item .collapse-level-1 a,
#sidebar-wrapper .main-nav .item .mm-collapse a {
    background-color: transparent !important;
    color: var(--template-text-dark) !important;
}

/* Forcer les styles pour les badges */
.badge-module,
.badge-number,
.menu-badge,
.menu-badge-new,
.badge,
.badge-info,
.badge-primary,
.system-counter {
    background-color: var(--template-bg-dark-60) !important;
    color: var(--template-text-light) !important;
}
`;
        
        // Appliquer le CSS
        styleElement.textContent = cssContent;
        
        console.log('[Enforcer] Variables CSS du template appliquées avec force');
    }
    
    // Appliquer immédiatement
    enforceTemplateVariables();
    
    // Réappliquer après un court délai pour s'assurer que tous les styles sont chargés
    setTimeout(enforceTemplateVariables, 500);
    
    // Réappliquer périodiquement pour s'assurer que les styles ne sont pas écrasés
    setInterval(enforceTemplateVariables, 2000);
});

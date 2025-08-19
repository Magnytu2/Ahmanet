/**
 * Script de vérification de compatibilité navigateur
 * Ce script vérifie la compatibilité du navigateur avec les fonctionnalités CSS et JS utilisées
 * et affiche des avertissements si nécessaire
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour vérifier la compatibilité du navigateur
    function checkBrowserCompatibility() {
        const compatibility = {
            cssVariables: window.CSS && window.CSS.supports && window.CSS.supports('--test', '0'),
            mutationObserver: 'MutationObserver' in window,
            fetch: 'fetch' in window,
            cssGrid: window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid'),
            flexbox: window.CSS && window.CSS.supports && window.CSS.supports('display', 'flex'),
            backgroundClip: window.CSS && window.CSS.supports && (
                window.CSS.supports('background-clip', 'text') || 
                window.CSS.supports('-webkit-background-clip', 'text')
            ),
            boxShadow: window.CSS && window.CSS.supports && window.CSS.supports('box-shadow', '0 0 0 0 rgba(0,0,0,0.1)'),
            cssImportant: true, // Tous les navigateurs modernes supportent !important
            localStorage: 'localStorage' in window
        };
        
        // Vérifier si le navigateur est IE11 ou plus ancien
        const isIE = !!document.documentMode;
        
        // Vérifier si le navigateur est Edge Legacy (avant Chromium)
        const isEdgeLegacy = !isIE && !!window.StyleMedia;
        
        // Détecter le navigateur
        let browserInfo = detectBrowser();
        
        // Vérifier les problèmes de compatibilité
        const issues = [];
        
        if (!compatibility.cssVariables) {
            issues.push('Les variables CSS ne sont pas supportées. Les couleurs peuvent ne pas s\'afficher correctement.');
        }
        
        if (!compatibility.mutationObserver) {
            issues.push('MutationObserver n\'est pas supporté. La détection de la classe admin-homepage peut ne pas fonctionner.');
        }
        
        if (!compatibility.fetch) {
            issues.push('L\'API Fetch n\'est pas supportée. Le vidage du cache Joomla via le bouton peut ne pas fonctionner.');
        }
        
        if (!compatibility.backgroundClip) {
            issues.push('background-clip: text n\'est pas supporté. Les icônes Material Two Tone peuvent ne pas s\'afficher correctement.');
        }
        
        if (isIE) {
            issues.push('Internet Explorer n\'est pas entièrement supporté. Veuillez utiliser un navigateur moderne.');
        }
        
        if (isEdgeLegacy) {
            issues.push('Microsoft Edge Legacy peut rencontrer des problèmes d\'affichage. Veuillez utiliser Edge Chromium ou un autre navigateur moderne.');
        }
        
        // Afficher les problèmes de compatibilité s'il y en a
        if (issues.length > 0) {
            showCompatibilityWarning(issues, browserInfo);
        } else {
            // Enregistrer dans le localStorage que la vérification a été effectuée
            if (compatibility.localStorage) {
                localStorage.setItem('browser-compatibility-checked', 'true');
                localStorage.setItem('browser-compatibility-timestamp', Date.now());
            }
        }
        
        // Enregistrer les informations de compatibilité dans la console pour le débogage
        console.log('[Compatibilité] Informations sur le navigateur:', browserInfo);
        console.log('[Compatibilité] Résultats des tests:', compatibility);
        console.log('[Compatibilité] Problèmes détectés:', issues);
    }
    
    // Fonction pour détecter le navigateur
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        let browser = 'Inconnu';
        let version = 'Inconnue';
        
        // Chrome
        if (/Chrome/.test(userAgent) && !/Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
            browser = 'Chrome';
            version = userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
        }
        // Firefox
        else if (/Firefox/.test(userAgent)) {
            browser = 'Firefox';
            version = userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
        }
        // Safari
        else if (/Safari/.test(userAgent) && !/Chrome|Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
            browser = 'Safari';
            version = userAgent.match(/Version\/(\d+\.\d+)/)[1];
        }
        // Edge (Chromium)
        else if (/Edg/.test(userAgent)) {
            browser = 'Edge Chromium';
            version = userAgent.match(/Edg\/(\d+\.\d+)/)[1];
        }
        // Edge (Legacy)
        else if (/Edge/.test(userAgent)) {
            browser = 'Edge Legacy';
            version = userAgent.match(/Edge\/(\d+\.\d+)/)[1];
        }
        // Opera
        else if (/OPR|Opera/.test(userAgent)) {
            browser = 'Opera';
            version = userAgent.match(/(?:OPR|Opera)\/(\d+\.\d+)/)[1];
        }
        // IE
        else if (/Trident/.test(userAgent)) {
            browser = 'Internet Explorer';
            version = userAgent.match(/rv:(\d+\.\d+)/)[1];
        }
        
        return {
            name: browser,
            version: version,
            userAgent: userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor
        };
    }
    
    // Fonction pour afficher un avertissement de compatibilité
    function showCompatibilityWarning(issues, browserInfo) {
        // Vérifier si l'avertissement a déjà été affiché récemment
        if (localStorage.getItem('browser-compatibility-checked')) {
            const timestamp = parseInt(localStorage.getItem('browser-compatibility-timestamp'));
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
            
            // Si l'avertissement a été affiché il y a moins de 24 heures, ne pas l'afficher à nouveau
            if (now - timestamp < oneDay) {
                console.log('[Compatibilité] Avertissement déjà affiché récemment, ignoré.');
                return;
            }
        }
        
        // Créer la boîte de dialogue d'avertissement
        const dialog = document.createElement('div');
        dialog.id = 'browser-compatibility-warning';
        dialog.style.position = 'fixed';
        dialog.style.top = '50%';
        dialog.style.left = '50%';
        dialog.style.transform = 'translate(-50%, -50%)';
        dialog.style.backgroundColor = '#fff';
        dialog.style.borderRadius = '4px';
        dialog.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        dialog.style.padding = '20px';
        dialog.style.zIndex = '10000';
        dialog.style.width = '500px';
        dialog.style.maxWidth = '90vw';
        dialog.style.maxHeight = '80vh';
        dialog.style.overflow = 'auto';
        
        // Ajouter le titre
        const title = document.createElement('h3');
        title.textContent = 'Avertissement de compatibilité navigateur';
        title.style.margin = '0 0 15px 0';
        title.style.color = '#dc3545';
        dialog.appendChild(title);
        
        // Ajouter les informations sur le navigateur
        const browserInfoDiv = document.createElement('div');
        browserInfoDiv.innerHTML = `
            <p><strong>Navigateur détecté:</strong> ${browserInfo.name} ${browserInfo.version}</p>
            <p><strong>Plateforme:</strong> ${browserInfo.platform}</p>
        `;
        browserInfoDiv.style.marginBottom = '15px';
        dialog.appendChild(browserInfoDiv);
        
        // Ajouter la liste des problèmes
        const issuesList = document.createElement('div');
        issuesList.innerHTML = '<p><strong>Problèmes de compatibilité détectés:</strong></p><ul>';
        
        issues.forEach(issue => {
            issuesList.innerHTML += `<li>${issue}</li>`;
        });
        
        issuesList.innerHTML += '</ul>';
        issuesList.style.marginBottom = '15px';
        dialog.appendChild(issuesList);
        
        // Ajouter les recommandations
        const recommendations = document.createElement('div');
        recommendations.innerHTML = `
            <p><strong>Recommandations:</strong></p>
            <p>Pour une expérience optimale, nous recommandons d'utiliser l'un des navigateurs suivants:</p>
            <ul>
                <li>Google Chrome (version 80 ou supérieure)</li>
                <li>Mozilla Firefox (version 72 ou supérieure)</li>
                <li>Microsoft Edge Chromium (version 80 ou supérieure)</li>
                <li>Safari (version 13.1 ou supérieure)</li>
            </ul>
        `;
        recommendations.style.marginBottom = '15px';
        dialog.appendChild(recommendations);
        
        // Ajouter les boutons
        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.justifyContent = 'space-between';
        buttonsDiv.style.marginTop = '20px';
        
        // Bouton "Ne plus afficher"
        const doNotShowButton = document.createElement('button');
        doNotShowButton.textContent = 'Ne plus afficher';
        doNotShowButton.style.padding = '8px 12px';
        doNotShowButton.style.backgroundColor = '#f0f0f0';
        doNotShowButton.style.border = '1px solid #ddd';
        doNotShowButton.style.borderRadius = '4px';
        doNotShowButton.style.cursor = 'pointer';
        
        doNotShowButton.addEventListener('click', function() {
            localStorage.setItem('browser-compatibility-checked', 'true');
            localStorage.setItem('browser-compatibility-timestamp', Date.now());
            dialog.remove();
            overlay.remove();
        });
        
        // Bouton "Fermer"
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fermer';
        closeButton.style.padding = '8px 12px';
        closeButton.style.backgroundColor = 'var(--mdb-primary, #3b71ca)';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('click', function() {
            dialog.remove();
            overlay.remove();
        });
        
        buttonsDiv.appendChild(doNotShowButton);
        buttonsDiv.appendChild(closeButton);
        dialog.appendChild(buttonsDiv);
        
        // Ajouter un overlay semi-transparent
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '9999';
        
        // Ajouter l'overlay et la boîte de dialogue au body
        document.body.appendChild(overlay);
        document.body.appendChild(dialog);
        
        // Enregistrer dans le localStorage que l'avertissement a été affiché
        localStorage.setItem('browser-compatibility-checked', 'true');
        localStorage.setItem('browser-compatibility-timestamp', Date.now());
    }
    
    // Exécuter la vérification de compatibilité après un court délai
    setTimeout(checkBrowserCompatibility, 2000);
});

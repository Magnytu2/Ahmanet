/**
 * Script de détection pour identifier si la classe admin-homepage est ajoutée au body
 * Ce script surveille les modifications de classes sur l'élément body
 * et enregistre dans la console quand la classe admin-homepage est ajoutée ou supprimée
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour vérifier si la classe est présente au chargement initial
    function checkInitialClass() {
        const body = document.body;
        if (body.classList.contains('admin-homepage')) {
            console.log('[Détecteur] La classe admin-homepage est présente au chargement initial');
            console.log('[Détecteur] Classes actuelles du body:', body.className);
        } else {
            console.log('[Détecteur] La classe admin-homepage n\'est PAS présente au chargement initial');
            console.log('[Détecteur] Classes actuelles du body:', body.className);
        }
    }

    // Vérifier immédiatement
    checkInitialClass();

    // Créer un observateur pour surveiller les changements de classe sur le body
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const body = document.body;
                const hasClass = body.classList.contains('admin-homepage');
                
                console.log('[Détecteur] Changement de classe détecté sur body');
                console.log('[Détecteur] Classes actuelles:', body.className);
                
                if (hasClass) {
                    console.log('[Détecteur] La classe admin-homepage a été AJOUTÉE');
                    
                    // Essayer d'identifier la source (stack trace)
                    console.log('[Détecteur] Stack trace:');
                    console.trace();
                    
                    // Tenter d'identifier les scripts actifs
                    const scripts = document.querySelectorAll('script[src]');
                    console.log('[Détecteur] Scripts chargés:');
                    scripts.forEach(script => console.log(' - ' + script.src));
                } else {
                    console.log('[Détecteur] La classe admin-homepage a été SUPPRIMÉE');
                }
            }
        });
    });

    // Configurer l'observateur pour surveiller les changements d'attributs sur le body
    observer.observe(document.body, { 
        attributes: true,
        attributeFilter: ['class']
    });

    // Vérifier à nouveau après un court délai pour détecter les modifications asynchrones
    setTimeout(function() {
        const body = document.body;
        if (body.classList.contains('admin-homepage')) {
            console.log('[Détecteur] La classe admin-homepage a été ajoutée de manière asynchrone');
            console.log('[Détecteur] Classes actuelles du body après délai:', body.className);
        }
    }, 1000);

    // Vérifier périodiquement pendant 10 secondes
    let checkCount = 0;
    const intervalId = setInterval(function() {
        checkCount++;
        const body = document.body;
        if (body.classList.contains('admin-homepage')) {
            console.log(`[Détecteur] Vérification #${checkCount}: La classe admin-homepage est présente`);
        } else {
            console.log(`[Détecteur] Vérification #${checkCount}: La classe admin-homepage n'est PAS présente`);
        }
        
        // Arrêter après 10 vérifications (10 secondes)
        if (checkCount >= 10) {
            clearInterval(intervalId);
            console.log('[Détecteur] Surveillance périodique terminée');
        }
    }, 1000);
});

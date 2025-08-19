/**
 * Script pour supprimer automatiquement la classe admin-homepage du body
 * Ce script surveille les modifications de classes sur l'élément body
 * et supprime immédiatement la classe admin-homepage si elle est ajoutée
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour supprimer la classe admin-homepage
    function removeHomepageClass() {
        const body = document.body;
        if (body.classList.contains('admin-homepage')) {
            console.log('[Remover] Suppression de la classe admin-homepage');
            body.classList.remove('admin-homepage');
            console.log('[Remover] Classes actuelles du body après suppression:', body.className);
            return true;
        }
        return false;
    }

    // Vérifier et supprimer immédiatement au chargement
    if (removeHomepageClass()) {
        console.log('[Remover] Classe admin-homepage supprimée au chargement initial');
    }

    // Créer un observateur pour surveiller les changements de classe sur le body
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const body = document.body;
                
                // Vérifier si la classe admin-homepage a été ajoutée
                if (body.classList.contains('admin-homepage')) {
                    console.log('[Remover] Classe admin-homepage détectée après modification');
                    
                    // Supprimer la classe avec un léger délai pour permettre au détecteur de la voir
                    setTimeout(function() {
                        body.classList.remove('admin-homepage');
                        console.log('[Remover] Classe admin-homepage supprimée après détection');
                        console.log('[Remover] Classes actuelles du body:', body.className);
                    }, 50);
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
    setTimeout(removeHomepageClass, 500);
    
    // Vérifier périodiquement pendant 10 secondes
    let checkCount = 0;
    const intervalId = setInterval(function() {
        checkCount++;
        if (removeHomepageClass()) {
            console.log(`[Remover] Vérification #${checkCount}: Classe admin-homepage supprimée`);
        }
        
        // Arrêter après 10 vérifications (10 secondes)
        if (checkCount >= 10) {
            clearInterval(intervalId);
            console.log('[Remover] Surveillance périodique terminée');
        }
    }, 1000);
});

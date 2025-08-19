/**
 * Script pour aider à vider les caches Joomla et navigateur
 * Ce script ajoute un bouton dans l'interface d'administration pour vider les caches
 * et fournit des instructions pour vider le cache du navigateur
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour créer le bouton de vidage du cache
    function createCacheClearButton() {
        // Vérifier si le bouton existe déjà
        if (document.getElementById('cache-clear-button')) {
            return;
        }
        
        // Créer le conteneur du bouton
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.bottom = '20px';
        buttonContainer.style.right = '20px';
        buttonContainer.style.zIndex = '9999';
        buttonContainer.id = 'cache-clear-container';
        
        // Créer le bouton principal
        const button = document.createElement('button');
        button.id = 'cache-clear-button';
        button.textContent = 'Vider les caches';
        button.style.backgroundColor = 'var(--mdb-primary)';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '8px 16px';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        button.style.fontWeight = '500';
        button.style.fontSize = '14px';
        
        // Ajouter l'effet hover
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--mdb-primary-hover, #386bc0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--mdb-primary)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        });
        
        // Ajouter le gestionnaire d'événements pour afficher le menu
        button.addEventListener('click', function() {
            showCacheOptions();
        });
        
        // Ajouter le bouton au conteneur
        buttonContainer.appendChild(button);
        
        // Ajouter le conteneur au body
        document.body.appendChild(buttonContainer);
    }
    
    // Fonction pour afficher les options de cache
    function showCacheOptions() {
        // Supprimer le menu existant s'il y en a un
        const existingMenu = document.getElementById('cache-options-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        // Créer le menu d'options
        const menu = document.createElement('div');
        menu.id = 'cache-options-menu';
        menu.style.position = 'fixed';
        menu.style.bottom = '70px';
        menu.style.right = '20px';
        menu.style.backgroundColor = '#fff';
        menu.style.borderRadius = '4px';
        menu.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        menu.style.padding = '15px';
        menu.style.zIndex = '9999';
        menu.style.width = '300px';
        menu.style.maxWidth = '90vw';
        
        // Ajouter le titre
        const title = document.createElement('h4');
        title.textContent = 'Options de cache';
        title.style.margin = '0 0 10px 0';
        title.style.color = 'var(--text-dark)';
        title.style.fontSize = '16px';
        menu.appendChild(title);
        
        // Ajouter les options
        const options = [
            { id: 'joomla-cache', text: 'Vider le cache Joomla', action: clearJoomlaCache },
            { id: 'browser-cache', text: 'Instructions cache navigateur', action: showBrowserCacheInstructions },
            { id: 'reload-page', text: 'Recharger la page (Ctrl+F5)', action: hardReloadPage }
        ];
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.id = option.id;
            button.textContent = option.text;
            button.style.display = 'block';
            button.style.width = '100%';
            button.style.padding = '8px 12px';
            button.style.margin = '5px 0';
            button.style.backgroundColor = '#f5f5f5';
            button.style.border = '1px solid #ddd';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            button.style.textAlign = 'left';
            button.style.color = 'var(--text-dark)';
            
            button.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e9e9e9';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            
            button.addEventListener('click', option.action);
            
            menu.appendChild(button);
        });
        
        // Ajouter le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fermer';
        closeButton.style.display = 'block';
        closeButton.style.width = '100%';
        closeButton.style.padding = '8px 12px';
        closeButton.style.margin = '10px 0 0 0';
        closeButton.style.backgroundColor = '#f0f0f0';
        closeButton.style.border = '1px solid #ddd';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = 'var(--text-dark)';
        
        closeButton.addEventListener('click', function() {
            menu.remove();
        });
        
        menu.appendChild(closeButton);
        
        // Ajouter le menu au body
        document.body.appendChild(menu);
    }
    
    // Fonction pour vider le cache Joomla
    function clearJoomlaCache() {
        // Créer une notification
        showNotification('Vidage du cache Joomla en cours...');
        
        // Rediriger vers l'URL de vidage du cache
        const cacheClearUrl = 'index.php?option=com_cache&task=purge&' + new Date().getTime();
        
        // Utiliser fetch pour éviter de quitter la page actuelle
        fetch(cacheClearUrl)
            .then(response => {
                if (response.ok) {
                    showNotification('Cache Joomla vidé avec succès!', 'success');
                    
                    // Fermer le menu
                    const menu = document.getElementById('cache-options-menu');
                    if (menu) menu.remove();
                } else {
                    showNotification('Erreur lors du vidage du cache Joomla.', 'error');
                }
            })
            .catch(error => {
                showNotification('Erreur lors du vidage du cache Joomla: ' + error, 'error');
            });
    }
    
    // Fonction pour afficher les instructions de vidage du cache navigateur
    function showBrowserCacheInstructions() {
        // Fermer le menu existant
        const existingMenu = document.getElementById('cache-options-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Créer la boîte de dialogue
        const dialog = document.createElement('div');
        dialog.id = 'browser-cache-instructions';
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
        title.textContent = 'Instructions pour vider le cache du navigateur';
        title.style.margin = '0 0 15px 0';
        title.style.color = 'var(--text-dark)';
        dialog.appendChild(title);
        
        // Ajouter les instructions
        const instructions = document.createElement('div');
        instructions.innerHTML = `
            <p><strong>Chrome:</strong></p>
            <ol>
                <li>Appuyez sur <kbd>Ctrl+Shift+Suppr</kbd> (Windows/Linux) ou <kbd>Cmd+Shift+Suppr</kbd> (Mac)</li>
                <li>Sélectionnez "Toutes les périodes" pour la plage de temps</li>
                <li>Cochez "Images et fichiers en cache"</li>
                <li>Cliquez sur "Effacer les données"</li>
                <li>Puis appuyez sur <kbd>Ctrl+F5</kbd> pour recharger la page</li>
            </ol>
            
            <p><strong>Firefox:</strong></p>
            <ol>
                <li>Appuyez sur <kbd>Ctrl+Shift+Suppr</kbd> (Windows/Linux) ou <kbd>Cmd+Shift+Suppr</kbd> (Mac)</li>
                <li>Sélectionnez "Tout" pour la plage de temps</li>
                <li>Cochez "Cache" et décochez les autres options</li>
                <li>Cliquez sur "Effacer maintenant"</li>
                <li>Puis appuyez sur <kbd>Ctrl+F5</kbd> pour recharger la page</li>
            </ol>
            
            <p><strong>Edge:</strong></p>
            <ol>
                <li>Appuyez sur <kbd>Ctrl+Shift+Suppr</kbd></li>
                <li>Sélectionnez "Toutes les périodes" pour la plage de temps</li>
                <li>Cochez "Images et fichiers mis en cache"</li>
                <li>Cliquez sur "Effacer maintenant"</li>
                <li>Puis appuyez sur <kbd>Ctrl+F5</kbd> pour recharger la page</li>
            </ol>
            
            <p><strong>Safari:</strong></p>
            <ol>
                <li>Appuyez sur <kbd>Option+Cmd+E</kbd></li>
                <li>Ou allez dans Safari > Préférences > Avancé > Cochez "Afficher le menu Développement"</li>
                <li>Puis Développement > Vider les caches</li>
                <li>Puis appuyez sur <kbd>Option+Cmd+R</kbd> pour recharger la page</li>
            </ol>
        `;
        instructions.style.fontSize = '14px';
        instructions.style.lineHeight = '1.5';
        instructions.style.color = 'var(--text-dark)';
        
        // Styliser les éléments kbd
        const kbds = instructions.querySelectorAll('kbd');
        kbds.forEach(kbd => {
            kbd.style.backgroundColor = '#f7f7f7';
            kbd.style.border = '1px solid #ccc';
            kbd.style.borderRadius = '3px';
            kbd.style.boxShadow = '0 1px 0 rgba(0,0,0,0.2)';
            kbd.style.padding = '2px 5px';
            kbd.style.margin = '0 2px';
            kbd.style.fontSize = '12px';
        });
        
        dialog.appendChild(instructions);
        
        // Ajouter le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fermer';
        closeButton.style.display = 'block';
        closeButton.style.width = '100%';
        closeButton.style.padding = '8px 12px';
        closeButton.style.margin = '15px 0 0 0';
        closeButton.style.backgroundColor = 'var(--mdb-primary)';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--mdb-primary-hover, #386bc0)';
        });
        
        closeButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--mdb-primary)';
        });
        
        closeButton.addEventListener('click', function() {
            dialog.remove();
            
            // Ajouter un overlay semi-transparent
            const overlay = document.getElementById('cache-dialog-overlay');
            if (overlay) overlay.remove();
        });
        
        dialog.appendChild(closeButton);
        
        // Ajouter un overlay semi-transparent
        const overlay = document.createElement('div');
        overlay.id = 'cache-dialog-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '9999';
        
        overlay.addEventListener('click', function() {
            dialog.remove();
            overlay.remove();
        });
        
        // Ajouter l'overlay et la boîte de dialogue au body
        document.body.appendChild(overlay);
        document.body.appendChild(dialog);
    }
    
    // Fonction pour recharger la page (équivalent à Ctrl+F5)
    function hardReloadPage() {
        showNotification('Rechargement forcé de la page...');
        
        // Utiliser location.reload(true) pour forcer le rechargement sans utiliser le cache
        window.location.reload(true);
    }
    
    // Fonction pour afficher une notification
    function showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.cache-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = 'cache-notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '80px';
        notification.style.right = '20px';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '10000';
        notification.style.maxWidth = '300px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.fontSize = '14px';
        
        // Définir le style en fonction du type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = 'var(--mdb-success, #14a44d)';
                notification.style.color = '#fff';
                break;
            case 'error':
                notification.style.backgroundColor = 'var(--mdb-danger, #dc4c64)';
                notification.style.color = '#fff';
                break;
            default:
                notification.style.backgroundColor = 'var(--mdb-info, #54b4d3)';
                notification.style.color = '#fff';
        }
        
        // Ajouter la notification au body
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Créer le bouton après un court délai pour s'assurer que le DOM est complètement chargé
    setTimeout(createCacheClearButton, 1000);
});

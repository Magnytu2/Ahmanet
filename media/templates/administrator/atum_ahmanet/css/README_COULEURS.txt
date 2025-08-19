DOCUMENTATION DES MODIFICATIONS - UNIFORMISATION DES COULEURS
Date: 18/08/2025

PROBLÈME RÉSOLU:
Incohérence des couleurs entre la page d'accueil et les autres pages d'administration.

FICHIERS DÉSACTIVÉS:
1. home-page.css - Appliquait des styles spécifiques à la page d'accueil via la classe "admin-homepage"
2. home-page-fix.js - Script qui détectait la page d'accueil et ajoutait la classe "admin-homepage"
3. main-page-direct.js - Script qui appliquait des styles spécifiques à la page principale

MODIFICATIONS EFFECTUÉES:
- Désactivation des chargements de fichiers dans index.php
- Sauvegarde des fichiers originaux dans le dossier backup_18082025

COMMENT REVENIR EN ARRIÈRE:
Pour réactiver les styles spécifiques à la page d'accueil, il suffit de décommenter les lignes suivantes dans index.php:
1. $wa->registerAndUseStyle('home-page', 'media/templates/administrator/atum_ahmanet/css/home-page.css', [], ['weight' => 1200]);
2. $wa->registerAndUseScript('home-page-fix', 'media/templates/administrator/atum_ahmanet/js/home-page-fix.js');
3. $wa->registerAndUseScript('main-page-direct', 'media/templates/administrator/atum_ahmanet/js/main-page-direct.js');

REMARQUE:
Cette modification permet d'avoir une apparence cohérente sur toutes les pages de l'administration, en évitant que la page d'accueil ait des couleurs différentes des autres pages.

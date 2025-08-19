# Configuration du template Atum Ahmanet

## Principes d'héritage avec le template parent Atum

Le template Atum Ahmanet est un template enfant qui hérite du template parent Atum de Joomla. Pour assurer un fonctionnement optimal, les principes suivants doivent être respectés :

### Structure d'héritage

1. **Déclaration du parent** : Le template parent est déclaré dans `templateDetails.xml` :
   ```xml
   <parent>atum</parent>
   ```

2. **Inclusion des fichiers PHP du parent** : Chaque fichier PHP principal du template enfant doit inclure son équivalent dans le template parent à la fin du fichier :
   ```php
   // Inclure le fichier du template parent
   include_once JPATH_THEMES . '/atum/[nom_du_fichier].php';
   ```

3. **IMPORTANT** : Pour le fichier `index.php`, il est crucial d'inclure directement le fichier parent et non un fichier de surcharge personnalisé :
   ```php
   // Inclure le fichier index.php du template parent
   include_once JPATH_THEMES . '/atum/index.php';
   ```

### Gestion des assets

1. **Désactivation du style parent** : Dans certains fichiers, le style du template parent est désactivé pour éviter les conflits :
   ```php
   $wa->disableStyle('template.active');
   ```

2. **Ordre de chargement des styles** : L'ordre de chargement des styles est important pour garantir la priorité correcte :
   ```php
   $wa->registerAndUseStyle('mdb', 'media/templates/administrator/atum_ahmanet/css/mdb.min.css');
   $wa->registerAndUseStyle('mdbootstrap-colors', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-colors.css');
   $wa->registerAndUseStyle('template-colors', 'media/templates/administrator/atum_ahmanet/css/template-colors.css');
   $wa->registerAndUseStyle('mdbootstrap-components', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-components.css');
   $wa->registerAndUseStyle('template-custom', 'media/templates/administrator/atum_ahmanet/css/template-custom.css');
   $wa->registerAndUseStyle('user', 'media/templates/administrator/atum_ahmanet/css/user.css');
   ```

## Système de couleurs MDBootstrap

Le template utilise un système de couleurs hybride qui combine les variables CSS d'Atum avec les couleurs MDBootstrap :

1. **Définition des variables** : Les couleurs sont définies dans les fichiers `index.php` et `cpanel.php` :
   ```php
   $mdbPrimary = $params->get('mdb-primary', '#3B71CA');
   $mdbSecondary = $params->get('mdb-secondary', '#9FA6B2');
   $mdbSuccess = $params->get('mdb-success', '#14A44D');
   $mdbDanger = $params->get('mdb-danger', '#DC4C64');
   $mdbWarning = $params->get('mdb-warning', '#E4A11B');
   $mdbInfo = $params->get('mdb-info', '#54B4D3');
   ```

2. **Génération des couleurs hover** : Les couleurs hover sont calculées dynamiquement (5% plus foncées) :
   ```php
   function darkenColor($hex, $percent = 5) {
       $hex = ltrim($hex, '#');
       $rgb = array_map('hexdec', str_split($hex, 2));
       
       foreach ($rgb as &$color) {
           $color = max(0, min(255, $color - ($color * ($percent / 100))));
           $color = round($color);
       }
       
       return '#' . implode('', array_map(function($c) { return str_pad(dechex($c), 2, '0', STR_PAD_LEFT); }, $rgb));
   }
   ```

3. **Variables CSS** : Les variables sont injectées dans le CSS via des styles inline :
   ```php
   $this->addStyleDeclaration("
   :root {
     --mdb-primary: {$mdbPrimary};
     --mdb-secondary: {$mdbSecondary};
     --mdb-success: {$mdbSuccess};
     ...
   }");
   ```

## Approche hybride pour les icônes

Le template utilise une approche hybride pour les icônes Material Design :

1. **SVG inline** pour les icônes fréquemment utilisées :
   - Implémentation via background-image avec SVG encodé en URL
   - Exemple dans les fichiers CSS

2. **CDN Google** pour les autres icônes :
   - Chargement à la demande via la classe CSS appropriée
   - Référencé dans les fichiers HTML/PHP

## Maintenance et mises à jour

1. **Vider le cache** après chaque modification :
   - Via le panneau d'administration : Système > Maintenance > Vider le cache
   - Ou manuellement en supprimant les fichiers dans `/cache`

2. **Surveiller les mises à jour** du template parent Atum et adapter le template enfant en conséquence

3. **Documenter les personnalisations** pour faciliter la maintenance future

## Résolution des problèmes courants

1. **Navigation non fonctionnelle** : Vérifier que le fichier `index.php` inclut correctement le fichier parent

2. **Styles non appliqués** : Vérifier l'ordre de chargement des fichiers CSS et la désactivation du style parent

3. **Icônes manquantes** : Vérifier le chargement des fichiers d'icônes et les remplacements CSS

4. **Erreurs JavaScript** : Vérifier la console du navigateur pour identifier les erreurs spécifiques

## Solution pour la sidebar sur toutes les pages d'administration

Toutes les pages d'administration nécessitent une solution spécifique pour garantir que les éléments actifs de la sidebar utilisent correctement la couleur primaire MDBootstrap :

1. **Approche multi-niveaux** :
   - CSS ultra-spécifique avec sélecteurs précis et `!important`
   - JavaScript pour appliquer des styles inline directement aux éléments
   - Détection robuste de toutes les pages d'administration et de la page principale
   - Application des styles en deux niveaux : styles de base pour toutes les pages et styles spécifiques pour la page d'accueil

2. **Fichiers clés** :
   - `sidebar-direct-fix.css` : Sélecteurs CSS ultra-spécifiques pour la sidebar
   - `home-page-fix.js` : Script pour appliquer les styles à toutes les pages d'administration
   - `main-page-direct.js` : Script complémentaire avec sélecteurs précis

3. **Sélecteurs CSS** :
   ```css
   /* Exemple de sélecteurs ultra-spécifiques */
   #sidebar-wrapper .main-nav-container .item-level-1.active > a,
   #sidebar-wrapper .main-nav-container .item.active > a,
   #sidebar-wrapper .main-nav .nav-item.active > a,
   #sidebar-wrapper .main-nav-container .item-level-1.current > a {
     background-color: #3B71CA !important;
     color: #fff !important;
     box-shadow: 0 2px 5px 0 rgba(59, 113, 202, 0.2), 0 2px 10px 0 rgba(59, 113, 202, 0.1) !important;
   }
   ```

4. **Application JavaScript** :
   ```javascript
   // Exemple de code pour appliquer les styles directement
   function applyElementStyles(element) {
     if (!element) return;
     
     // Éviter d'appliquer les styles plusieurs fois
     if (element.dataset.styledByAtumAhmanet === 'true') return;
     
     element.style.backgroundColor = config.primaryColor;
     element.style.color = '#fff';
     element.style.boxShadow = config.primaryShadow;
     element.dataset.styledByAtumAhmanet = 'true';
     
     // Appliquer les styles aux icônes et titres
     const icons = element.querySelectorAll('[class^="icon-"], [class*=" icon-"]');
     icons.forEach(icon => {
       icon.style.color = '#fff';
     });
     
     const titles = element.querySelectorAll('.sidebar-item-title');
     titles.forEach(title => {
       title.style.color = '#fff';
     });
   }
   ```

5. **Détection des pages** :
   ```javascript
   // Détection de toutes les pages d'administration
   function isAdminPage() {
     const currentUrl = window.location.href;
     const urlMatch = config.adminUrlPatterns.some(pattern => currentUrl.includes(pattern));
     
     if (urlMatch) {
       logger.log('Page d\'administration détectée');
       return true;
     }
     
     return false;
   }
   
   // Détection spécifique de la page principale
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
     
     // Autres vérifications (patterns d'URL, classes body, éléments spécifiques)
     // ...
   }
   ```

6. **Fonction principale** :
   ```javascript
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
   ```

7. **Chargement des assets et optimisations** :
   - Les fichiers CSS sont chargés avec un poids élevé (1000+) pour garantir leur priorité
   - Les scripts JavaScript sont exécutés immédiatement, après DOMContentLoaded, après load, et périodiquement
   - Un MutationObserver surveille les changements dans la sidebar pour réappliquer les styles si nécessaire
   - Délais d'initialisation réduits (100ms au lieu de 500ms) pour une application plus rapide des styles
   - Écouteur d'événements popstate pour les changements d'URL dynamiques

Cette solution garantit que les éléments actifs de la sidebar sur toutes les pages d'administration utilisent correctement la couleur primaire MDBootstrap (#3B71CA), même si la structure HTML est modifiée dynamiquement.

## Améliorations visuelles de la sidebar

La sidebar du template Atum Ahmanet a été améliorée avec des effets visuels modernes et élégants basés sur MDBootstrap :

1. **Architecture CSS** :
   - Utilisation de variables CSS pour les couleurs, ombres, transitions et rayons de bordure
   - Organisation en sections logiques (wrapper, items, icônes, badges, sous-menus)
   - Sélecteurs optimisés pour cibler précisément les éléments sans modifier la structure HTML

2. **Effets visuels** :
   - Transitions fluides pour tous les états (hover, active, focus)
   - Ombres subtiles avec profondeur variable selon l'état
   - Animation "shine" sur les éléments actifs pour un effet moderne
   - Effet de pulsation pour les icônes en mode sidebar réduite
   - Dégradés subtils pour les séparateurs

3. **Hiérarchie visuelle** :
   - Indentation visuelle pour les sous-menus avec ligne verticale
   - Badges arrondis avec effet d'échelle au survol
   - Indicateurs visuels pour les éléments avec sous-menus
   - Tailles de police différenciées selon le niveau de menu

4. **Compatibilité mobile** :
   - Adaptation des tailles et espacements pour les écrans tactiles
   - Animation de transition pour l'ouverture/fermeture sur mobile
   - Augmentation de la taille des zones cliquables pour l'accessibilité

5. **Exemples de styles clés** :
   ```css
   /* Variables CSS */
   :root {
     --mdb-transition-standard: all 0.2s ease-in-out;
     --mdb-shadow-1: 0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 2px 10px 0 rgba(0, 0, 0, 0.03);
     --mdb-shadow-2: 0 4px 7px 0 rgba(0, 0, 0, 0.07), 0 4px 15px 0 rgba(0, 0, 0, 0.05);
     --mdb-shadow-primary: 0 2px 5px 0 rgba(59, 113, 202, 0.2), 0 2px 10px 0 rgba(59, 113, 202, 0.1);
   }
   
   /* Style de base pour les items */
   .main-nav .item a,
   .main-nav .item .sidebar-item-title-wrapper {
     padding: 0.75rem 1.25rem !important;
     margin: 0.25rem 0.75rem !important;
     border-radius: 0.375rem !important;
     transition: var(--mdb-transition-standard) !important;
   }
   
   /* Effet de survol */
   .main-nav .item a:hover,
   .main-nav .item .sidebar-item-title-wrapper:hover {
     background-color: rgba(59, 113, 202, 0.1) !important;
     color: var(--mdb-primary) !important;
     box-shadow: var(--mdb-shadow-1) !important;
   }
   ```

6. **Animation pour les éléments actifs** :
   ```css
   @keyframes shine {
     0% {
       background-position: -100% 0;
     }
     100% {
       background-position: 200% 0;
     }
   }
   
   .main-nav .item.active > a,
   .main-nav .item.current > a {
     background-color: var(--mdb-primary) !important;
     color: var(--mdb-text-white) !important;
     box-shadow: var(--mdb-shadow-primary) !important;
     position: relative !important;
     overflow: hidden !important;
   }
   
   .main-nav .item.active > a::after,
   .main-nav .item.current > a::after {
     content: '' !important;
     position: absolute !important;
     top: 0 !important;
     left: 0 !important;
     width: 100% !important;
     height: 100% !important;
     background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent) !important;
     background-size: 200% 100% !important;
     animation: shine 3s infinite !important;
   }
   ```

## Journal des modifications — 2025-08-18

### Correction: suppression des couleurs inline sur la page d'accueil (dashboard)

- __Scripts neutralisés__ (plus d'injection `style.color` inline):
  - `media/templates/administrator/atum_ahmanet/js/ultimate-title-fix.js` (neutralisé)
  - `media/templates/administrator/atum_ahmanet/js/title-color-fix.js` (neutralisé)
  - `media/templates/administrator/atum_ahmanet/js/direct-title-fix.js` (neutralisé)
  - `media/templates/administrator/atum_ahmanet/js/admin-colors-fixer.js` (bloc quickicons supprimé; plus d'injection inline sur `.quickicon-*`)

- __Motif__: des styles inline imposaient `color: var(--text-dark) !important` sur de nombreux conteneurs du dashboard, se traduisant par `rgb(79,79,79) !important` et rendant les règles CSS barrées dans DevTools.

- __Résultat__: les couleurs sont désormais pilotées par le CSS (`admin-colors-fix.css`, `user.css`, Atum). Les quickicons et liens ne reçoivent plus de couleurs forcées en inline.

- __Recommandations mises à jour__:
  - Privilégier le CSS pour les couleurs. Réserver le JS à la __détection__ (p.ex. ajouter `body.admin-homepage`) sans écrire de styles inline.
  - Éviter les règles globales agressives avec `!important` dans `user.css` (ex.: sur `body a`), afin d'éviter les conflits.
  - Si nécessaire, ajouter une règle ciblée et sûre uniquement pour la page d'accueil dans `media/templates/administrator/atum_ahmanet/css/admin-colors-fix.css`:
    ```css
    /* Page d’accueil admin: couleur texte par défaut (exemple) */
    body.admin-homepage #content {
      color: var(--template-text-dark, var(--text-dark));
    }
    ```

- __Procédure après modification__:
  - Vider le cache Joomla (Système > Maintenance > Vider le cache et Cache expiré).
  - Hard reload navigateur (Ctrl+F5) pour purger le cache.

- __Tests attendus__:
  - Plus d'attributs inline `style="color: rgb(79,79,79) !important;"` sur `#content` et les modules du dashboard.
  - Plus d'effets de valeurs barrées dans DevTools pour les couleurs.
  - Les quickicons utilisent les règles CSS sans override inline.

- __Fichiers modifiés__:
  - `js/ultimate-title-fix.js` (neutralisé)
  - `js/title-color-fix.js` (neutralisé)
  - `js/direct-title-fix.js` (neutralisé)
  - `js/admin-colors-fixer.js` (suppression du bloc `quickicon` inline)

Ces améliorations visuelles créent une expérience utilisateur plus élégante et moderne tout en maintenant la compatibilité avec la structure HTML du template parent Atum et en respectant les conventions de style MDBootstrap.

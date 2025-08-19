# Documentation des modifications du template Joomla "atum_ahmanet"

## Contexte
Ce document recense les modifications apportées au template enfant "atum_ahmanet" pour l'administration de Joomla 5.3.2, notamment concernant la gestion des icônes.

## Modifications principales

### 1. Remplacement de l'icône "plus" par Material Design Two Tone "add_box"

#### Fichiers modifiés
- `media/templates/administrator/atum_ahmanet/js/icon-replacer.js` : Script JavaScript pour remplacer dynamiquement l'icône "plus" par "add_box"
- `media/templates/administrator/atum_ahmanet/css/user.css` : Styles CSS pour les icônes Material Design Two Tone
- `media/templates/administrator/atum_ahmanet/css/material-icons.css` : Définition des tailles d'icônes en unités relatives (rem)

#### Fonctionnalités implémentées
- Remplacement dynamique de la classe `.icon-plus` par l'icône Material Design Two Tone "add_box"
- Gestion des chargements AJAX et des modifications dynamiques du DOM
- Utilisation d'unités relatives (rem) pour l'accessibilité

### 2. Intégration des ressources dans le template

#### Fichiers modifiés
- `administrator/templates/atum_ahmanet/index.php`
- `administrator/templates/atum_ahmanet/component.php`
- `administrator/templates/atum_ahmanet/error.php`
- `administrator/templates/atum_ahmanet/cpanel.php`

#### Fonctionnalités implémentées
- Chargement des styles MDBootstrap et Material Icons
- Chargement de la police Roboto
- Chargement du script de remplacement d'icône

### 3. Styles CSS pour les icônes

#### Fichiers modifiés
- `media/templates/administrator/atum_ahmanet/css/user.css`
- `media/templates/administrator/atum_ahmanet/css/material-icons.css`

#### Fonctionnalités implémentées
- Définition des styles pour les icônes Material Design Two Tone
- Styles spécifiques pour les quickicons
- Utilisation exclusive d'unités relatives (rem) pour l'accessibilité

## Fichiers créés

### 1. Scripts JavaScript
- `media/templates/administrator/atum_ahmanet/js/icon-replacer.js` : Remplacement de l'icône "plus"
- `media/templates/administrator/atum_ahmanet/js/icon-mapping.js` : Mapping entre FontAwesome et Material Design (non utilisé actuellement)
- `media/templates/administrator/atum_ahmanet/js/icon-replacer-all.js` : Remplacement global des icônes (non utilisé actuellement)

### 2. Styles CSS
- `media/templates/administrator/atum_ahmanet/css/roboto.css` : Import de la police Roboto
- `media/templates/administrator/atum_ahmanet/css/material-icons.css` : Styles pour les icônes Material Design

### 3. Fichiers de template
- `administrator/templates/atum_ahmanet/component.php`
- `administrator/templates/atum_ahmanet/error.php`
- `administrator/templates/atum_ahmanet/cpanel.php`

### 4. Correction des couleurs au survol des boutons

#### Fichiers modifiés
- `administrator/templates/atum_ahmanet/index.php` : Ajout des variables CSS hover et correction de l'ordre de chargement des fichiers CSS
- `administrator/templates/atum_ahmanet/cpanel.php` : Ajout des variables CSS hover et correction de l'ordre de chargement des fichiers CSS
- `media/templates/administrator/atum_ahmanet/css/user.css` : Utilisation des variables CSS hover au lieu de couleurs fixes

#### Fonctionnalités implémentées
- Fonction PHP `darkenColor()` pour calculer les couleurs hover (5% plus foncées)
- Variables CSS hover dans les styles inline `:root` pour les couleurs dynamiques
- Ordre de chargement des fichiers CSS corrigé pour garantir la priorité correcte
- Utilisation des variables CSS hover dans user.css pour une cohérence visuelle

#### Problème résolu
- Les couleurs au survol des boutons ne reflétaient pas correctement les paramètres du template
- Les styles n'étaient pas cohérents entre les différentes pages (notamment la page d'accueil)
- Conflits de priorité CSS entre les différents fichiers de styles

## Bonnes pratiques pour le template Atum Ahmanet

### Standards MDBootstrap pour les boutons

1. Tailles standard des boutons MDBootstrap:
   - Padding: 0.5rem 1rem
   - Border-radius: 0.25rem
   - Font-size: 0.875rem
   - Line-height: 1.5
   - Font-weight: 500

2. Couleurs MDBootstrap par défaut:
   - Primary: #3b71ca (bouton profil utilisateur)
   - Secondary: #9FA6B2 (boutons secondaires)
   - Info: #54b4d3 (boutons d'information)
   - Success: #14a44d (boutons de succès)
   - Warning: #e4a11b (boutons d'avertissement)

3. Effets et styles:
   - Box-shadow: 0 4px 9px -4px rgba(couleur, 0.3)
   - Transition: all 0.2s
   - Hover effect: box-shadow plus prononcée et couleur 5% plus foncée

### Approche pour les icônes Material Design

1. SVG inline pour les icônes fréquemment utilisées:
   - Icônes critiques: launch, edit, delete, save, add_box
   - Implémentation via background-image avec SVG encodé en URL
   - Exemple pour l'icône "launch":
   ```css
   .icon-launch::before {
     content: "" !important;
     display: inline-block !important;
     width: 1.125rem !important;
     height: 1.125rem !important;
     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23FFFFFF'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/%3E%3C/svg%3E") !important;
     background-repeat: no-repeat !important;
     background-position: center !important;
     background-size: contain !important;
   }
   ```

2. CDN pour les autres icônes:
   - Utilisation du CDN Google pour les icônes moins fréquentes
   - Chargement via la classe CSS appropriée
   - Implémentation:
   ```html
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone" rel="stylesheet">
   <span class="material-icons-two-tone">nom_icone</span>
   ```

### Structure des fichiers CSS et ordre de chargement

1. Organisation des fichiers CSS:
   - `mdbootstrap-colors.css`: définition des couleurs de base
   - `template-colors.php`: génération dynamique des styles basés sur les paramètres
   - `mdbootstrap-components.css`: composants UI standardisés
   - `user.css`: personnalisations et surcharges spécifiques

2. Ordre de chargement optimal:
   1. `mdb.min.css` - Styles de base MDBootstrap
   2. `roboto.css` et `material-icons.css` - Polices et icônes
   3. `mdbootstrap-colors.css` - Définition des variables CSS de base
   4. `template-colors.php` - Génération dynamique des styles basés sur les paramètres
   5. `mdbootstrap-components.css` - Composants MDBootstrap personnalisés
   6. `template-custom.css` - Personnalisations spécifiques au template
   7. `user.css` - Styles utilisateur avec la plus haute priorité
   8. `logos.css` - Styles pour les logos

## Prochaines étapes potentielles

1. Amélioration des performances du script de remplacement d'icônes
2. Extension du remplacement à d'autres icônes spécifiques
3. Optimisation des styles CSS pour une meilleure intégration avec MDBootstrap
4. Ajout de fonctionnalités d'accessibilité supplémentaires
5. Documentation complète des variables CSS disponibles pour les développeurs

## Notes techniques

- Le remplacement d'icônes utilise l'API MutationObserver pour détecter les changements dans le DOM
- Les styles utilisent des unités relatives (rem) pour améliorer l'accessibilité
- Le template enfant hérite de toutes les fonctionnalités du template parent "atum"

## Détails techniques sur les couleurs au survol

### Fonction darkenColor()

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

Cette fonction prend une couleur hexadécimale et la rend plus foncée du pourcentage spécifié (5% par défaut).

### Variables CSS hover

Les variables CSS hover sont définies dans le bloc `:root` des styles inline de `index.php` et `cpanel.php` :

```css
:root {
  --mdb-primary: #3B71CA;
  --mdb-secondary: #9FA6B2;
  --mdb-success: #14A44D;
  --mdb-danger: #DC4C64;
  --mdb-warning: #E4A11B;
  --mdb-info: #54B4D3;
  --mdb-light: #FBFBFB;
  --mdb-dark: #332D2D;
  
  /* Hover variants (5% darker) */
  --mdb-primary-hover: #386bc0;
  --mdb-secondary-hover: #979ea9;
  --mdb-success-hover: #139c49;
  --mdb-danger-hover: #d1485f;
  --mdb-warning-hover: #d89919;
  --mdb-info-hover: #50abc9;
  --mdb-dark-hover: #302b2b;
  
  /* RGB versions for opacity support */
  --mdb-primary-rgb: 59, 113, 202;
  --mdb-secondary-rgb: 159, 166, 178;
  /* etc. */
}
```

### Ordre de chargement des fichiers CSS

L'ordre de chargement des fichiers CSS est crucial pour garantir la priorité correcte des styles :

1. `mdb.min.css` - Styles de base MDBootstrap
2. `roboto.css` et `material-icons.css` - Polices et icônes
3. `mdbootstrap-colors.css` - Définition des variables CSS de base
4. `template-colors.php` - Génération dynamique des styles basés sur les paramètres
5. `mdbootstrap-components.css` - Composants MDBootstrap personnalisés
6. `template-custom.css` - Personnalisations spécifiques au template
7. `user.css` - Styles utilisateur avec la plus haute priorité
8. `logos.css` - Styles pour les logos

### Utilisation des variables hover dans user.css

Exemple d'utilisation des variables hover dans `user.css` :

```css
.btn-primary:hover {
  background-color: var(--mdb-primary-hover);
  border-color: var(--mdb-primary-hover);
}

.header-profile .dropdown-toggle:hover {
  background-color: var(--mdb-secondary-hover);
  border-color: var(--mdb-secondary-hover);
}

.btn-success:hover {
  background-color: var(--mdb-success-hover);
  border-color: var(--mdb-success-hover);
}
```

Cette approche garantit que les couleurs au survol sont cohérentes avec les paramètres du template et s'appliquent correctement sur toutes les pages.

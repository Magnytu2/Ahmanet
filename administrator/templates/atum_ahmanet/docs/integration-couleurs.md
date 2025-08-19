# Documentation : Intégration des couleurs MDBootstrap dans le template Atum Ahmanet

## Introduction

Cette documentation explique la nouvelle approche d'intégration des couleurs MDBootstrap dans le template enfant Atum Ahmanet, compatible avec le système natif de variables CSS du template parent Atum.

## Principe de fonctionnement

### 1. Utilisation des variables CSS natives d'Atum

Le template parent Atum utilise un système de variables CSS (custom properties) pour gérer dynamiquement les couleurs. Notre template enfant Ahmanet s'appuie désormais sur ce système au lieu de générer un CSS personnalisé, ce qui assure une meilleure compatibilité et une prise en compte immédiate des changements de paramètres.

### 2. Initialisation des variables MDBootstrap

Les variables CSS spécifiques à MDBootstrap sont initialisées directement dans le fichier `index.php` du template enfant, en utilisant les valeurs des paramètres du template. Ces variables sont ensuite utilisées dans le fichier `mdbootstrap-colors.css` pour styliser les composants MDBootstrap.

### 3. Structure des fichiers

- `index.php` : Initialise les variables CSS avec les valeurs des paramètres
- `mdbootstrap-colors.css` : Définit les styles des composants MDBootstrap en utilisant ces variables
- `mdbootstrap-components.css` : Contient les styles spécifiques aux composants MDBootstrap

## Paramètres de couleurs disponibles

Le template Ahmanet offre les paramètres de couleurs MDBootstrap suivants :

- `mdb-primary` : Couleur principale (#3B71CA par défaut)
- `mdb-secondary` : Couleur secondaire (#9FA6B2 par défaut)
- `mdb-success` : Couleur de succès (#14A44D par défaut)
- `mdb-danger` : Couleur de danger (#DC4C64 par défaut)
- `mdb-warning` : Couleur d'avertissement (#E4A11B par défaut)
- `mdb-info` : Couleur d'information (#54B4D3 par défaut)
- `mdb-light` : Couleur claire (#FBFBFB par défaut)
- `mdb-dark` : Couleur foncée (#332D2D par défaut)

Ces paramètres sont accessibles dans l'administration de Joomla, dans la section "Styles de template" > "Atum Ahmanet" > onglet "Couleurs MDBootstrap".

## Utilisation des classes CSS MDBootstrap

### Boutons

```html
<button class="btn btn-primary">Bouton Primary</button>
<button class="btn btn-secondary">Bouton Secondary</button>
<button class="btn btn-success">Bouton Success</button>
<button class="btn btn-danger">Bouton Danger</button>
<button class="btn btn-warning">Bouton Warning</button>
<button class="btn btn-info">Bouton Info</button>
```

### Textes colorés

```html
<p class="text-primary">Texte en couleur primary</p>
<p class="text-secondary">Texte en couleur secondary</p>
<p class="text-success">Texte en couleur success</p>
<p class="text-danger">Texte en couleur danger</p>
<p class="text-warning">Texte en couleur warning</p>
<p class="text-info">Texte en couleur info</p>
```

### Arrière-plans colorés

```html
<div class="bg-primary">Arrière-plan primary</div>
<div class="bg-secondary">Arrière-plan secondary</div>
<div class="bg-success">Arrière-plan success</div>
<div class="bg-danger">Arrière-plan danger</div>
<div class="bg-warning">Arrière-plan warning</div>
<div class="bg-info">Arrière-plan info</div>
```

### Alertes

```html
<div class="alert alert-primary">Alerte primary</div>
<div class="alert alert-secondary">Alerte secondary</div>
<div class="alert alert-success">Alerte success</div>
<div class="alert alert-danger">Alerte danger</div>
<div class="alert alert-warning">Alerte warning</div>
<div class="alert alert-info">Alerte info</div>
```

### Badges

```html
<span class="badge badge-primary">Badge primary</span>
<span class="badge badge-secondary">Badge secondary</span>
<span class="badge badge-success">Badge success</span>
<span class="badge badge-danger">Badge danger</span>
<span class="badge badge-warning">Badge warning</span>
<span class="badge badge-info">Badge info</span>
```

## Personnalisation avancée

Si vous souhaitez personnaliser davantage les styles MDBootstrap, vous pouvez modifier le fichier `mdbootstrap-colors.css` ou ajouter vos propres styles dans le fichier `user.css`.

## Compatibilité avec le template parent Atum

Cette nouvelle approche assure une compatibilité totale avec le template parent Atum :

1. Les styles du template parent sont chargés normalement
2. Les variables CSS d'Atum sont préservées et utilisées
3. Les styles MDBootstrap sont appliqués par-dessus, en respectant la hiérarchie CSS

## Migration depuis l'ancienne approche

Si vous utilisiez l'ancienne approche avec génération dynamique de CSS :

1. Exécutez le script de nettoyage `cleanup.php` pour désactiver le plugin et supprimer les fichiers inutiles
2. Assurez-vous que le style du template parent n'est plus désactivé dans `index.php`
3. Vérifiez que les variables CSS MDBootstrap sont correctement initialisées dans `index.php`

## Dépannage

### Les couleurs ne s'appliquent pas correctement

1. Vérifiez que le style du template parent n'est pas désactivé dans `index.php`
2. Assurez-vous que les variables CSS sont correctement initialisées
3. Videz le cache du navigateur et le cache Joomla

### Les boutons apparaissent blancs ou sans style

1. Vérifiez que le fichier `mdbootstrap-colors.css` est bien chargé
2. Inspectez les styles avec les outils de développement du navigateur pour identifier les conflits CSS
3. Assurez-vous que les classes CSS sont correctement appliquées aux éléments

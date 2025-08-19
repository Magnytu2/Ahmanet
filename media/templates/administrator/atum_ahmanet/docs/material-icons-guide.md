# Guide d'utilisation des icônes Material Design Two Tone dans Ahmanet

Ce guide explique comment utiliser les icônes Material Design Two Tone dans le template administrateur Ahmanet.

## Table des matières

1. [Introduction](#introduction)
2. [Approche hybride](#approche-hybride)
3. [Utilisation des icônes SVG inline](#utilisation-des-icônes-svg-inline)
4. [Utilisation des icônes via CDN](#utilisation-des-icônes-via-cdn)
5. [Personnalisation des icônes](#personnalisation-des-icônes)
6. [Liste des icônes disponibles](#liste-des-icônes-disponibles)

## Introduction

Le template Ahmanet utilise les icônes Material Design Two Tone pour offrir une interface moderne et cohérente. Ces icônes sont implémentées selon une approche hybride pour optimiser les performances tout en maintenant une grande flexibilité.

## Approche hybride

Notre implémentation combine deux méthodes :

1. **SVG inline** : Pour les icônes fréquemment utilisées, nous utilisons des SVG encodés directement dans le CSS.
2. **Chargement via CDN** : Pour les icônes moins fréquentes, nous utilisons le CDN Google.

Cette approche permet d'optimiser les performances en évitant des requêtes HTTP supplémentaires pour les icônes critiques, tout en maintenant l'accès à la bibliothèque complète d'icônes Material Design.

## Utilisation des icônes SVG inline

Les icônes SVG inline sont disponibles via des classes CSS spécifiques. Pour les utiliser :

```html
<!-- Exemple avec l'icône "launch" (lien externe) -->
<span class="icon-md-launch"></span>

<!-- Exemple avec l'icône "face" (utilisateur) -->
<span class="icon-md-face"></span>
```

### Tailles disponibles

Vous pouvez modifier la taille des icônes en ajoutant une classe de taille :

```html
<!-- Petite icône (14px) -->
<span class="icon-md-edit icon-md-sm"></span>

<!-- Icône moyenne (18px) - taille par défaut -->
<span class="icon-md-edit icon-md-md"></span>

<!-- Grande icône (24px) -->
<span class="icon-md-edit icon-md-lg"></span>

<!-- Très grande icône (36px) -->
<span class="icon-md-edit icon-md-xl"></span>
```

### Couleurs MDBootstrap

Vous pouvez appliquer les couleurs MDBootstrap aux icônes :

```html
<!-- Icône avec couleur primaire -->
<span class="icon-md-edit icon-md-primary"></span>

<!-- Icône avec couleur secondaire -->
<span class="icon-md-edit icon-md-secondary"></span>

<!-- Autres couleurs disponibles : success, danger, warning, info, light, dark -->
```

## Utilisation des icônes via CDN

Pour les icônes qui ne sont pas disponibles en SVG inline, utilisez la classe `material-icons-two-tone` :

```html
<!-- Inclure le lien vers le CDN dans votre en-tête HTML (déjà fait dans le template) -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone" rel="stylesheet">

<!-- Utilisation de l'icône -->
<span class="material-icons-two-tone">nom_de_l_icone</span>

<!-- Exemple avec l'icône "dashboard" -->
<span class="material-icons-two-tone">dashboard</span>
```

### Tailles pour les icônes CDN

```html
<!-- Petite icône (18px) -->
<span class="material-icons-two-tone md-18">dashboard</span>

<!-- Icône moyenne (24px) - taille par défaut -->
<span class="material-icons-two-tone md-24">dashboard</span>

<!-- Grande icône (36px) -->
<span class="material-icons-two-tone md-36">dashboard</span>

<!-- Très grande icône (48px) -->
<span class="material-icons-two-tone md-48">dashboard</span>
```

### Variantes de couleur pour les icônes CDN

```html
<!-- Icône sombre sur fond clair (mode par défaut) -->
<span class="material-icons-two-tone md-dark">dashboard</span>

<!-- Icône sombre désactivée -->
<span class="material-icons-two-tone md-dark md-inactive">dashboard</span>

<!-- Icône claire sur fond sombre -->
<span class="material-icons-two-tone md-light">dashboard</span>

<!-- Icône claire désactivée -->
<span class="material-icons-two-tone md-light md-inactive">dashboard</span>
```

## Personnalisation des icônes

### Modification des couleurs SVG

Pour modifier la couleur d'une icône SVG inline, vous pouvez créer une classe personnalisée dans votre CSS :

```css
.icon-md-custom-color::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23FF0000'%3E...%3C/svg%3E") !important;
}
```

Remplacez `%23FF0000` par le code couleur hexadécimal souhaité (avec `%23` au lieu de `#`).

## Liste des icônes disponibles

### Icônes SVG inline

Les icônes suivantes sont disponibles en SVG inline :

- `icon-md-launch` - Lien externe
- `icon-md-face` - Utilisateur
- `icon-md-home` - Accueil
- `icon-md-edit` - Édition
- `icon-md-delete` - Suppression
- `icon-md-save` - Sauvegarde
- `icon-md-notifications` - Notifications
- `icon-md-map` - Carte/Plan
- `icon-md-settings` - Paramètres
- `icon-md-add` - Ajouter
- `icon-md-search` - Recherche

### Icônes via CDN

Pour les autres icônes, consultez la [bibliothèque d'icônes Material Design](https://fonts.google.com/icons?icon.style=Two+tone) et utilisez-les via la classe `material-icons-two-tone`.

---

## Exemples d'utilisation dans le template Ahmanet

### Bouton avec icône SVG inline

```html
<button class="btn btn-primary">
  <span class="icon-md-save"></span>
  Enregistrer
</button>
```

### Remplacement d'une icône Font Awesome

Pour remplacer une icône Font Awesome existante :

```css
/* Masquer l'icône Font Awesome */
.icon-font-awesome {
  display: none !important;
}

/* Ajouter l'icône Material Design */
.container-icon::before {
  content: "" !important;
  display: inline-block !important;
  width: 1.125rem !important;
  height: 1.125rem !important;
  background-image: url("data:image/svg+xml,...") !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: contain !important;
  vertical-align: middle !important;
}
```

---

Document créé le 16/08/2025 pour le template Ahmanet (enfant d'Atum) pour Joomla 5.3+.

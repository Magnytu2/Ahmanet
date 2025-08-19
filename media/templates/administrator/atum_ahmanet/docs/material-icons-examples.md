# Exemples d'utilisation des icônes Material Design Two Tone dans Ahmanet

Ce document présente des exemples concrets d'utilisation des icônes Material Design Two Tone dans le template administrateur Ahmanet.

## Exemples de composants UI avec icônes

### Boutons avec icônes

```html
<!-- Bouton primaire avec icône d'enregistrement -->
<button class="btn btn-primary">
  <span class="icon-md-save"></span>
  Enregistrer
</button>

<!-- Bouton secondaire avec icône d'édition -->
<button class="btn btn-secondary">
  <span class="icon-md-edit"></span>
  Modifier
</button>

<!-- Bouton de suppression avec icône -->
<button class="btn btn-danger">
  <span class="icon-md-delete"></span>
  Supprimer
</button>

<!-- Bouton d'ajout avec icône -->
<button class="btn btn-success">
  <span class="icon-md-add"></span>
  Ajouter
</button>
```

### Liens avec icônes

```html
<!-- Lien externe avec icône -->
<a href="https://example.com" target="_blank" class="external-link">
  <span class="icon-md-launch"></span>
  Voir le site
</a>

<!-- Lien de navigation avec icône -->
<a href="index.php?option=com_content" class="nav-link">
  <span class="icon-md-home"></span>
  Accueil
</a>
```

### Badges avec icônes

```html
<!-- Badge de notification -->
<span class="badge badge-warning">
  <span class="icon-md-notifications icon-md-sm"></span>
  5
</span>

<!-- Badge d'information -->
<span class="badge badge-info">
  <span class="icon-md-info icon-md-sm"></span>
  Info
</span>
```

## Remplacement des icônes Font Awesome existantes

### Module Frontend

Exemple de remplacement de l'icône Font Awesome dans le module frontend :

```php
// Fichier: administrator/modules/mod_frontend/tmpl/default.php
// Original:
<span class="icon-external-link" aria-hidden="true"></span>

// Remplacer par:
<span class="icon-md-launch" aria-hidden="true"></span>
```

### Bouton de profil utilisateur

Exemple de remplacement de l'icône utilisateur dans le header :

```php
// Fichier: administrator/templates/atum_ahmanet/html/layouts/chromes/header.php
// Original:
<span class="icon-user-circle" aria-hidden="true"></span>

// Remplacer par:
<span class="icon-md-face" aria-hidden="true"></span>
```

## Utilisation dans les menus

### Menu latéral

```html
<!-- Élément de menu avec icône -->
<li class="nav-item">
  <a class="nav-link" href="index.php?option=com_content">
    <span class="icon-md-article" aria-hidden="true"></span>
    <span class="nav-item-title">Articles</span>
  </a>
</li>

<!-- Sous-menu avec icône -->
<li class="nav-item">
  <a class="nav-link has-arrow" href="#" aria-expanded="false">
    <span class="icon-md-settings" aria-hidden="true"></span>
    <span class="nav-item-title">Configuration</span>
  </a>
  <ul class="nav-children">
    <!-- ... -->
  </ul>
</li>
```

## Utilisation dans les formulaires

### Champs de recherche

```html
<!-- Champ de recherche avec icône -->
<div class="input-group">
  <span class="input-group-text">
    <span class="icon-md-search" aria-hidden="true"></span>
  </span>
  <input type="text" class="form-control" placeholder="Rechercher...">
</div>
```

### Boutons d'action dans les formulaires

```html
<!-- Groupe de boutons d'action -->
<div class="btn-toolbar">
  <div class="btn-group mr-2">
    <button type="button" class="btn btn-primary">
      <span class="icon-md-save" aria-hidden="true"></span>
      Enregistrer
    </button>
  </div>
  <div class="btn-group mr-2">
    <button type="button" class="btn btn-secondary">
      <span class="icon-md-save" aria-hidden="true"></span>
      Enregistrer & Fermer
    </button>
  </div>
  <div class="btn-group">
    <button type="button" class="btn btn-danger">
      <span class="icon-md-close" aria-hidden="true"></span>
      Annuler
    </button>
  </div>
</div>
```

## Utilisation dans les tableaux

### Actions de tableau

```html
<!-- Boutons d'action dans un tableau -->
<table class="table">
  <thead>
    <tr>
      <th>Titre</th>
      <th>Statut</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Article 1</td>
      <td>Publié</td>
      <td>
        <button class="btn btn-sm btn-outline-primary">
          <span class="icon-md-edit icon-md-sm" aria-hidden="true"></span>
        </button>
        <button class="btn btn-sm btn-outline-danger">
          <span class="icon-md-delete icon-md-sm" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Utilisation avec des états

### Icônes d'état

```html
<!-- État publié -->
<span class="badge bg-success">
  <span class="icon-md-check icon-md-sm" aria-hidden="true"></span>
  Publié
</span>

<!-- État non publié -->
<span class="badge bg-danger">
  <span class="icon-md-close icon-md-sm" aria-hidden="true"></span>
  Non publié
</span>

<!-- État archivé -->
<span class="badge bg-info">
  <span class="icon-md-archive icon-md-sm" aria-hidden="true"></span>
  Archivé
</span>
```

## Utilisation avec des alertes

### Messages système

```html
<!-- Alerte de succès -->
<div class="alert alert-success">
  <span class="icon-md-check-circle" aria-hidden="true"></span>
  Opération réussie !
</div>

<!-- Alerte d'erreur -->
<div class="alert alert-danger">
  <span class="icon-md-error" aria-hidden="true"></span>
  Une erreur est survenue.
</div>

<!-- Alerte d'information -->
<div class="alert alert-info">
  <span class="icon-md-info" aria-hidden="true"></span>
  Information importante.
</div>

<!-- Alerte d'avertissement -->
<div class="alert alert-warning">
  <span class="icon-md-warning" aria-hidden="true"></span>
  Attention !
</div>
```

## Utilisation dans les modales

### Entêtes de modales

```html
<!-- Entête de modale avec icône -->
<div class="modal-header">
  <h5 class="modal-title">
    <span class="icon-md-info" aria-hidden="true"></span>
    Information
  </h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
</div>
```

## Utilisation avec des cartes

### Entêtes de cartes

```html
<!-- Entête de carte avec icône -->
<div class="card">
  <div class="card-header">
    <span class="icon-md-dashboard" aria-hidden="true"></span>
    Tableau de bord
  </div>
  <div class="card-body">
    <!-- Contenu de la carte -->
  </div>
</div>
```

## Utilisation avec des onglets

### Onglets avec icônes

```html
<!-- Onglets avec icônes -->
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" data-bs-toggle="tab" href="#home" role="tab">
      <span class="icon-md-home" aria-hidden="true"></span>
      Accueil
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-bs-toggle="tab" href="#profile" role="tab">
      <span class="icon-md-face" aria-hidden="true"></span>
      Profil
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-bs-toggle="tab" href="#settings" role="tab">
      <span class="icon-md-settings" aria-hidden="true"></span>
      Paramètres
    </a>
  </li>
</ul>
```

---

Document créé le 16/08/2025 pour le template Ahmanet (enfant d'Atum) pour Joomla 5.3+.

# Template Administrateur Ahmanet pour Joomla 5.3+

Ahmanet est un template administrateur enfant d'Atum, conçu pour offrir une interface moderne et optimisée pour Joomla 5.3+. Il intègre les styles MDBootstrap et les icônes Material Design Two Tone pour une expérience utilisateur améliorée.

## Caractéristiques principales

- **Styles MDBootstrap** : Intégration complète des styles MDBootstrap pour les boutons et composants UI
- **Icônes Material Design Two Tone** : Approche hybride combinant SVG inline et CDN pour une performance optimale
- **Personnalisation avancée** : Variables CSS pour une personnalisation facile des couleurs et styles
- **Optimisation des performances** : Chargement optimisé des ressources pour une interface réactive
- **Support du mode sombre** : Adaptation automatique au mode sombre du système ou préférence utilisateur
- **Responsive design** : Interface adaptative pour tous les appareils

## Documentation

### Guides d'utilisation

- [Guide d'utilisation des icônes Material Design](docs/material-icons-guide.md)
- [Exemples d'utilisation des icônes](docs/material-icons-examples.md)

### Documentation technique

- [Changelog](docs/changelog.md)

## Structure des fichiers CSS

- **user.css** : Styles principaux du template
- **material-icons.css** : Définitions des icônes Material Design Two Tone
- **logos.css** : Styles pour les différents logos du template
- **template-colors.php** : Génération dynamique des variables CSS pour les couleurs MDBootstrap

## Paramètres du template

Le template Ahmanet offre plusieurs options de personnalisation via l'interface d'administration de Joomla :

### Couleurs

- **hue** : Teinte principale (format HSL)
- **bg-light** : Couleur de fond claire
- **text-dark** : Couleur de texte foncée
- **text-light** : Couleur de texte claire
- **link-color** : Couleur des liens
- **link-color-dark** : Couleur des liens en mode sombre
- **special-color** : Couleur spéciale
- **monochrome** : Option pour activer/désactiver le mode monochrome
- **colorScheme** : Schéma de couleurs (suivre OS, clair, sombre)

### Images et logos

- **loginLogo** : Logo de la page de connexion
- **logoBrandLarge** : Logo principal du site
- **logoBrandSmall** : Petit logo du site

## Installation

1. Installez Joomla 5.3 ou supérieur
2. Copiez le dossier `atum_ahmanet` dans le répertoire `media/templates/administrator/`
3. Activez le template via l'interface d'administration de Joomla

## Compatibilité

- Joomla 5.3+
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## Crédits

- Template parent : Atum (Joomla)
- Framework CSS : MDBootstrap
- Icônes : Material Design Two Tone (Google)

## Licence

Ce template est distribué sous licence GPL v2 ou ultérieure.

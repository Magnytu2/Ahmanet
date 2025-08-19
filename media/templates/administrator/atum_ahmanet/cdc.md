# Cahier des Charges - Template Atum Ahmanet

## Présentation du projet

Le template Atum Ahmanet est un template administrateur pour Joomla 5.x, conçu comme un template enfant d'Atum. Il intègre les styles et composants de MDBootstrap tout en conservant la compatibilité avec le template parent Atum.

## Objectifs

- Moderniser l'interface d'administration de Joomla avec les styles MDBootstrap
- Maintenir la compatibilité totale avec le template parent Atum
- Améliorer l'expérience utilisateur avec des composants visuels modernes
- Offrir une personnalisation avancée via des paramètres de template

## Spécifications techniques

### Architecture

- Template enfant basé sur Atum (déclaration dans templateDetails.xml)
- Inclusion des fichiers du parent avec surcharge sélective
- Système de variables CSS pour la personnalisation des couleurs
- Intégration des composants MDBootstrap

### Système de couleurs

- Conservation des variables CSS d'Atum (hue, bg-light, text-dark, etc.)
- Ajout des variables MDBootstrap (primary, secondary, success, etc.) configurables via les paramètres du template
- Couleurs entièrement dynamiques et personnalisables depuis l'interface d'administration
- Génération dynamique des variables RGB à partir des valeurs hexadécimales
- Calcul automatique des couleurs hover (5% plus foncées)
- Application des couleurs via template-colors.php qui génère le CSS dynamiquement

### Composants UI

#### Boutons

- Style MDBootstrap avec padding, border-radius et effets standardisés
- Palette de couleurs dynamique configurée via les paramètres du template:
  - primary (défaut: #3b71ca)
  - secondary (défaut: #9fa6b2)
  - success (défaut: #14a44d)
  - warning (défaut: #e4a11b)
  - info (défaut: #54b4d3)
- Effets hover avec couleurs 5% plus foncées calculées automatiquement
- Box-shadow améliorée pour un effet de profondeur
- Intégration d'icônes Google Material Design Two Tone

#### Icônes

- Approche hybride: SVG inline pour icônes critiques, CDN Google pour les autres
- Remplacement des icônes Font Awesome par des icônes Google Material Design Two Tone
- Implémentation via background-image avec SVG encodé en URL pour les icônes critiques
- Utilisation du CDN Google Fonts pour charger la famille d'icônes Material Icons Two Tone
- Script JavaScript non-intrusif pour remplacer dynamiquement les icônes

### Structure des fichiers CSS

- mdbootstrap-colors.css: définition des couleurs de base
- template-colors.php: génération dynamique des styles basés sur les paramètres
- user.css: personnalisations et surcharges spécifiques
- mdbootstrap-components.css: composants UI standardisés

## Paramètres personnalisables

- Couleurs principales (primary, secondary, success, warning, info)
- Options d'affichage (hue, bg-light, text-dark, text-light)
- Logos et images (loginLogo, logoBrandLarge, logoBrandSmall)
- Options de thème (monochrome, colorScheme)

## Contraintes techniques

- Intervention limitée aux dossiers suivants:
  - `media/templates/administrator/atum_ahmanet` (ressources média)
  - `administrator/templates/atum_ahmanet` (fichiers du template)
- Pas de modification des fichiers du template parent Atum
- Respect de la structure d'héritage de Joomla

## Compatibilité et maintenance

- Compatible avec Joomla 5.x
- Surveillance des mises à jour d'Atum pour maintenir la compatibilité
- Documentation complète pour faciliter la maintenance
- Tests réguliers sur différents navigateurs et résolutions

## Livrables

- Fichiers du template complet
- Documentation technique et guide d'utilisation
- Guide de personnalisation pour les développeurs
- Exemples de configurations

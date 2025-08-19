# Template Administrateur Ahmanet

## Présentation
Ahmanet est un template administrateur pour Joomla 5.x, conçu comme un template enfant d'Atum. Il intègre les styles MDBootstrap et les icônes Material Design Two Tone pour offrir une interface moderne et élégante.

## Caractéristiques principales
- Intégration complète des couleurs MDBootstrap
- Utilisation des icônes Material Design Two Tone
- Personnalisation des logos et de l'identité visuelle
- Styles de composants UI modernisés (boutons, cartes, alertes, etc.)
- Support multilingue (français et anglais)
- Paramètres de personnalisation des couleurs

## Structure des fichiers

### Fichiers principaux
- `index.php` - Point d'entrée du template
- `templateDetails.xml` - Configuration du template et paramètres
- `README.md` - Documentation (ce fichier)

### CSS
- `media/templates/administrator/atum_ahmanet/css/mdbootstrap-colors.css` - Variables de couleurs MDBootstrap
- `media/templates/administrator/atum_ahmanet/css/mdbootstrap-components.css` - Styles des composants UI
- `media/templates/administrator/atum_ahmanet/css/logos.css` - Styles pour les logos
- `media/templates/administrator/atum_ahmanet/css/user.css` - Personnalisations spécifiques

### JavaScript
- `media/templates/administrator/atum_ahmanet/js/template-colors.php` - Génération dynamique des variables CSS
- `media/templates/administrator/atum_ahmanet/js/icon-replacer.js` - Remplacement des icônes Font Awesome

### Images
- `media/templates/administrator/atum_ahmanet/images/logos/` - Logos personnalisés

### Langues
- `administrator/templates/atum_ahmanet/language/en-GB/` - Traductions anglaises
- `administrator/templates/atum_ahmanet/language/fr-FR/` - Traductions françaises

## Paramètres du template
Le template offre plusieurs options de personnalisation accessibles via l'interface d'administration de Joomla.

### Couleurs MDBootstrap
- Primary: Couleur principale (#3B71CA par défaut)
- Secondary: Couleur secondaire (#9FA6B2 par défaut)
- Success: Couleur de succès (#14A44D par défaut)
- Danger: Couleur d'erreur (#DC4C64 par défaut)
- Warning: Couleur d'avertissement (#E4A11B par défaut)
- Info: Couleur d'information (#54B4D3 par défaut)
- Light: Couleur claire (#FBFBFB par défaut)
- Dark: Couleur foncée (#332D2D par défaut)

### Logos
- Logo de connexion: Affiché sur la page de connexion
- Logo principal: Affiché dans l'en-tête de l'administration
- Petit logo: Version compacte pour les affichages réduits

## Icônes Material Design
Le template utilise une approche hybride pour les icônes:
1. SVG inline pour les icônes fréquemment utilisées
2. CDN Google pour les autres icônes Material Design Two Tone

## Maintenance et mise à jour
Pour mettre à jour le template:
1. Modifiez les fichiers CSS dans le dossier `media/templates/administrator/atum_ahmanet/css/`
2. Ajoutez de nouvelles icônes dans le fichier `user.css`
3. Personnalisez les couleurs via l'interface d'administration

## Compatibilité
Ce template est compatible avec Joomla 5.x et a été testé spécifiquement avec Joomla 5.3.2.

## Crédits
- Template parent Atum: Équipe Joomla
- MDBootstrap: https://mdbootstrap.com/
- Material Design Icons: Google
- Développement: POUSSIN Cyrille

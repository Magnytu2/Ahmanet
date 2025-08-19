# Ahmanet (Joomla Admin Template)

Ahmanet est un template enfant de Atum pour l'administration Joomla!

- Héritage du template parent Atum (voir dministrator/templates/atum_ahmanet/templateDetails.xml).
- Système de couleurs hybride avec variables MDBootstrap (--mdb-primary, etc.) et variables Atum.
- Remplacement d’icônes: Material Icons (Two Tone) et SVG inline pour les icônes critiques.
- Personnalisations CSS organisées dans media/templates/administrator/atum_ahmanet/css/.
- Scripts utilitaires: sauvegarde/snapshot PowerShell (hmanet-backup.ps1, hmanet-snapshot.ps1).

## Démarrage rapide

1. Installer le template dans dministrator/templates/atum_ahmanet/ et ses assets dans media/templates/administrator/atum_ahmanet/.
2. Configurer les couleurs dans l’admin (variables MDBootstrap/Atum) si nécessaire.
3. Consulter la documentation:
   - media/templates/administrator/atum_ahmanet/documentation.md
   - dministrator/templates/atum_ahmanet/docs/configuration.md

## Développement

- Les couleurs dynamiques sont générées par 	emplate-colors.php et alignées avec MDBootstrap.
- Les styles d’icônes du tableau de bord sont dans css/dashboard-icons.css.
- Normalisation des fins de ligne via .gitattributes (LF pour le code, CRLF pour scripts Windows).

## Licence

MIT — voir LICENSE.
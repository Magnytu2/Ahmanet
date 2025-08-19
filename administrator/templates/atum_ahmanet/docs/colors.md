# Documentation du système de couleurs dynamiques pour Ahmanet

## Introduction

Le template administrateur Ahmanet intègre un système avancé de gestion des couleurs qui permet de personnaliser facilement l'apparence de l'interface d'administration Joomla. Ce système utilise les paramètres du template pour générer dynamiquement des styles CSS qui sont appliqués immédiatement à l'interface.

## Fonctionnement technique

### Architecture du système

Le système de couleurs dynamiques d'Ahmanet est composé de plusieurs éléments :

1. **Paramètres du template** : Définis dans `templateDetails.xml` sous le fieldset `ahmanet_colors`.
2. **Générateur de CSS** : Script PHP (`generate-colors.php`) qui récupère les paramètres et génère un fichier CSS statique.
3. **Plugin système** : Plugin `ahmanetcolors` qui déclenche la génération du CSS lorsque les paramètres sont modifiés.
4. **Fichier CSS généré** : Fichier `generated-colors.css` qui contient les styles CSS générés.

### Flux de travail

1. L'administrateur modifie les paramètres de couleur dans l'interface de gestion des templates Joomla.
2. Lors de la sauvegarde des paramètres, le plugin système `ahmanetcolors` est déclenché.
3. Le plugin appelle le script `generate-colors.php` qui récupère les paramètres et génère le fichier CSS.
4. Le fichier CSS est chargé par le template avec un timestamp basé sur sa date de modification pour éviter les problèmes de cache.

## Utilisation

### Configuration des couleurs

1. Accédez à **Extensions > Templates > Styles**.
2. Sélectionnez le style **Atum Ahmanet**.
3. Allez à l'onglet **MDBootstrap Colors**.
4. Modifiez les couleurs selon vos préférences :
   - **Primary** : Couleur principale pour les boutons et éléments d'interface.
   - **Secondary** : Couleur secondaire pour les boutons et éléments d'interface.
   - **Success** : Couleur pour les messages et boutons de succès.
   - **Danger** : Couleur pour les messages et boutons d'erreur.
   - **Warning** : Couleur pour les messages et boutons d'avertissement.
   - **Info** : Couleur pour les messages et boutons d'information.
   - **Light** : Couleur claire pour les arrière-plans.
   - **Dark** : Couleur foncée pour le texte et les arrière-plans.
5. Cliquez sur **Enregistrer** pour appliquer les modifications.

### Vérification des modifications

Après avoir enregistré les modifications, vous devriez voir un message de confirmation indiquant que les couleurs ont été mises à jour. Les modifications devraient être visibles immédiatement dans l'interface d'administration.

Si les modifications ne sont pas visibles, essayez de :

1. Rafraîchir la page (Ctrl+F5 pour forcer le rechargement complet).
2. Vider le cache de Joomla (Système > Maintenance > Vider le cache).
3. Vérifier que le plugin système `ahmanetcolors` est activé (Extensions > Plugins).

## Personnalisation avancée

### Modification des styles générés

Si vous souhaitez modifier la façon dont les couleurs sont appliquées aux éléments de l'interface, vous pouvez éditer le script `generate-colors.php` situé dans le dossier `media/templates/administrator/atum_ahmanet/js/`.

Le script génère des styles CSS pour différents éléments de l'interface, comme les boutons, les arrière-plans, les textes, etc. Vous pouvez ajouter ou modifier ces styles selon vos besoins.

### Ajout de nouvelles couleurs

Pour ajouter de nouvelles couleurs au système :

1. Ajoutez un nouveau champ dans le fichier `templateDetails.xml` sous le fieldset `ahmanet_colors`.
2. Mettez à jour les fichiers de langue pour ajouter les libellés et descriptions du nouveau champ.
3. Modifiez le script `generate-colors.php` pour prendre en compte la nouvelle couleur et générer les styles CSS correspondants.

## Dépannage

### Les couleurs ne sont pas mises à jour

Si les couleurs ne sont pas mises à jour après modification des paramètres, vérifiez que :

1. Le plugin système `ahmanetcolors` est activé.
2. Le fichier `generated-colors.css` existe dans le dossier `media/templates/administrator/atum_ahmanet/css/`.
3. Le fichier `generated-colors.css` a été modifié récemment (vérifiez la date de modification).
4. Le cache du navigateur est vidé (Ctrl+F5).
5. Le cache de Joomla est vidé (Système > Maintenance > Vider le cache).

### Erreurs dans la génération du CSS

Si vous rencontrez des erreurs lors de la génération du CSS, vérifiez les logs d'erreur de PHP et de Joomla pour plus d'informations.

## Conclusion

Le système de couleurs dynamiques d'Ahmanet offre une grande flexibilité pour personnaliser l'apparence de l'interface d'administration Joomla. Il permet de modifier facilement les couleurs des éléments de l'interface sans avoir à éditer directement les fichiers CSS.

Pour toute question ou assistance, contactez l'équipe de support Joomstyle.

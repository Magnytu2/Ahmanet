<?php
/**
 * Script de nettoyage pour le template Atum Ahmanet
 * Ce script désactive le plugin ahmanetcolors et supprime les fichiers de génération CSS
 * qui ne sont plus nécessaires avec la nouvelle approche compatible avec Atum
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Installer\Installer;
use Joomla\Database\ParameterType;

/**
 * Classe de nettoyage pour le template Atum Ahmanet
 */
class AtumAhmanetCleanup
{
    /**
     * Exécute le nettoyage
     *
     * @return void
     */
    public static function execute()
    {
        // Désactiver le plugin ahmanetcolors
        self::disablePlugin();
        
        // Supprimer les fichiers de génération CSS
        self::removeGeneratedFiles();
        
        // Afficher un message de confirmation
        Factory::getApplication()->enqueueMessage('Le nettoyage du template Atum Ahmanet a été effectué avec succès.', 'success');
    }
    
    /**
     * Désactive le plugin ahmanetcolors
     *
     * @return void
     */
    private static function disablePlugin()
    {
        try {
            $db = Factory::getDbo();
            $query = $db->getQuery(true)
                ->update($db->quoteName('#__extensions'))
                ->set($db->quoteName('enabled') . ' = 0')
                ->where($db->quoteName('type') . ' = ' . $db->quote('plugin'))
                ->where($db->quoteName('folder') . ' = ' . $db->quote('system'))
                ->where($db->quoteName('element') . ' = ' . $db->quote('ahmanetcolors'));
            
            $db->setQuery($query);
            $db->execute();
            
            Factory::getApplication()->enqueueMessage('Le plugin ahmanetcolors a été désactivé.', 'info');
        } catch (Exception $e) {
            Factory::getApplication()->enqueueMessage('Erreur lors de la désactivation du plugin ahmanetcolors: ' . $e->getMessage(), 'error');
        }
    }
    
    /**
     * Supprime les fichiers de génération CSS
     *
     * @return void
     */
    private static function removeGeneratedFiles()
    {
        $files = [
            JPATH_ROOT . '/media/templates/administrator/atum_ahmanet/js/generate-colors.php',
            JPATH_ROOT . '/media/templates/administrator/atum_ahmanet/css/generated-colors.css',
        ];
        
        foreach ($files as $file) {
            if (file_exists($file)) {
                if (@unlink($file)) {
                    Factory::getApplication()->enqueueMessage('Fichier supprimé: ' . basename($file), 'info');
                } else {
                    Factory::getApplication()->enqueueMessage('Impossible de supprimer le fichier: ' . basename($file), 'warning');
                }
            }
        }
    }
}

// Exécuter le nettoyage
AtumAhmanetCleanup::execute();

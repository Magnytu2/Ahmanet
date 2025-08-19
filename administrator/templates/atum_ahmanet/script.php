<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum_Ahmanet
 *
 * @copyright   (C) 2023 Joomstyle, All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Installer\InstallerScript;
use Joomla\CMS\Language\Text;

/**
 * Script file for Atum Ahmanet template
 *
 * @since  1.0
 */
class Atum_AhmanetInstallerScript extends InstallerScript
{
    /**
     * Method to run after an install/update/uninstall method
     *
     * @param   string  $type    The type of change (install, update or discover_install)
     * @param   object  $parent  The class calling this method
     *
     * @return  boolean  True on success
     */
    public function postflight($type, $parent)
    {
        // Générer le fichier CSS des couleurs lors de l'installation ou de la mise à jour
        if ($type === 'install' || $type === 'update') {
            $this->generateColorsCss();
        }

        // Enregistrer le plugin d'événement système
        $this->registerSystemPlugin();

        return true;
    }

    /**
     * Génère le fichier CSS des couleurs
     *
     * @return  boolean  True on success
     */
    private function generateColorsCss()
    {
        // Chemin vers le script de génération des couleurs
        $scriptPath = JPATH_ROOT . '/media/templates/administrator/atum_ahmanet/js/generate-colors.php';
        
        // Vérifier si le script existe
        if (file_exists($scriptPath)) {
            // Inclure le script
            require_once $scriptPath;
            
            // Générer le fichier CSS
            if (class_exists('AhmanetColorGenerator')) {
                AhmanetColorGenerator::generateCssFile();
                Factory::getApplication()->enqueueMessage(Text::_('Les couleurs du template Ahmanet ont été générées.'), 'success');
                return true;
            }
        }
        
        Factory::getApplication()->enqueueMessage(Text::_('Impossible de générer les couleurs du template Ahmanet.'), 'warning');
        return false;
    }

    /**
     * Enregistre le plugin d'événement système
     *
     * @return  boolean  True on success
     */
    private function registerSystemPlugin()
    {
        // Inclure le fichier système
        $systemFile = JPATH_ADMINISTRATOR . '/templates/atum_ahmanet/system.php';
        
        if (file_exists($systemFile)) {
            require_once $systemFile;
            
            // Ajouter un observateur pour l'événement onExtensionAfterSave
            $dispatcher = Factory::getApplication()->getDispatcher();
            $dispatcher->addListener('onExtensionAfterSave', [AhmanetTemplateSystem::class, 'onExtensionAfterSave']);
            
            return true;
        }
        
        return false;
    }
}

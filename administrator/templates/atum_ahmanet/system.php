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
use Joomla\CMS\Uri\Uri;

/**
 * Classe pour gérer les événements système du template Ahmanet
 */
class AhmanetTemplateSystem
{
    /**
     * Méthode appelée après la sauvegarde des paramètres du template
     *
     * @param   string  $context  Le contexte de l'événement
     * @param   object  $table    L'objet table qui a été sauvegardé
     * @param   bool    $isNew    True si l'objet est nouveau
     *
     * @return  void
     */
    public static function onExtensionAfterSave($context, $table, $isNew)
    {
        // Vérifier si c'est le template Ahmanet qui est sauvegardé
        if ($context === 'com_templates.style' && $table->template === 'atum_ahmanet') {
            // Chemin vers le script de génération des couleurs
            $scriptPath = JPATH_ROOT . '/media/templates/administrator/atum_ahmanet/js/generate-colors.php';
            
            // Vérifier si le script existe
            if (file_exists($scriptPath)) {
                // Inclure le script
                require_once $scriptPath;
                
                // Générer le fichier CSS
                AhmanetColorGenerator::generateCssFile();
                
                // Ajouter un message de confirmation
                Factory::getApplication()->enqueueMessage('Les couleurs du template Ahmanet ont été mises à jour.', 'success');
            }
        }
    }
}

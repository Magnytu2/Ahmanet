<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum_Ahmanet
 *
 * @copyright   (C) 2023 Joomstyle, All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\Factory;

/**
 * Script pour générer un fichier CSS statique avec les couleurs MDBootstrap
 * Ce script est appelé lorsque les paramètres du template sont modifiés
 */
class AhmanetColorGenerator
{
    /**
     * Génère le fichier CSS avec les couleurs MDBootstrap
     *
     * @return void
     */
    public static function generateCssFile()
    {
        // Obtenir l'instance de l'application
        $app = Factory::getApplication();
        
        // Obtenir les paramètres du template
        $templateParams = $app->getTemplate(true)->params;
        
        // Récupérer les couleurs MDBootstrap depuis les paramètres
        $mdbPrimary   = $templateParams->get('mdb-primary', '#3B71CA');
        $mdbSecondary = $templateParams->get('mdb-secondary', '#9FA6B2');
        $mdbSuccess   = $templateParams->get('mdb-success', '#14A44D');
        $mdbDanger    = $templateParams->get('mdb-danger', '#DC4C64');
        $mdbWarning   = $templateParams->get('mdb-warning', '#E4A11B');
        $mdbInfo      = $templateParams->get('mdb-info', '#54B4D3');
        $mdbLight     = $templateParams->get('mdb-light', '#FBFBFB');
        $mdbDark      = $templateParams->get('mdb-dark', '#332D2D');
        
        // Calculer les couleurs hover (légèrement plus foncées)
        $mdbPrimaryHover   = self::darkenColor($mdbPrimary, 5);
        $mdbSecondaryHover = self::darkenColor($mdbSecondary, 5);
        $mdbSuccessHover   = self::darkenColor($mdbSuccess, 5);
        $mdbDangerHover    = self::darkenColor($mdbDanger, 5);
        $mdbWarningHover   = self::darkenColor($mdbWarning, 5);
        $mdbInfoHover      = self::darkenColor($mdbInfo, 5);
        
        // Générer le contenu CSS
        $css = "/* Styles générés automatiquement pour les couleurs MDBootstrap */\n";
        $css .= "/* Généré le " . date('Y-m-d H:i:s') . " */\n\n";
        
        // Primary
        $css .= "/* Primary */\n";
        $css .= ".btn-primary,\n";
        $css .= ".bg-primary,\n";
        $css .= ".header-item a[href*=\"option=com_messages\"],\n";
        $css .= ".header-item a[href^=\"http\"].header-item-content {\n";
        $css .= "  background-color: {$mdbPrimary} !important;\n";
        $css .= "  border-color: {$mdbPrimary} !important;\n";
        $css .= "  box-shadow: 0 4px 9px -4px {$mdbPrimary}80 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".btn-primary:hover,\n";
        $css .= ".btn-primary:focus,\n";
        $css .= ".header-item a[href*=\"option=com_messages\"]:hover,\n";
        $css .= ".header-item a[href*=\"option=com_messages\"]:focus,\n";
        $css .= ".header-item a[href^=\"http\"].header-item-content:hover,\n";
        $css .= ".header-item a[href^=\"http\"].header-item-content:focus {\n";
        $css .= "  background-color: {$mdbPrimaryHover} !important;\n";
        $css .= "  border-color: {$mdbPrimaryHover} !important;\n";
        $css .= "  box-shadow: 0 8px 9px -4px {$mdbPrimary}4D, 0 4px 18px 0 {$mdbPrimary}33 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".text-primary,\n";
        $css .= ".link-primary {\n";
        $css .= "  color: {$mdbPrimary} !important;\n";
        $css .= "}\n\n";
        
        // Secondary
        $css .= "/* Secondary */\n";
        $css .= ".btn-secondary,\n";
        $css .= ".bg-secondary {\n";
        $css .= "  background-color: {$mdbSecondary} !important;\n";
        $css .= "  border-color: {$mdbSecondary} !important;\n";
        $css .= "  box-shadow: 0 4px 9px -4px {$mdbSecondary}80 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".btn-secondary:hover,\n";
        $css .= ".btn-secondary:focus {\n";
        $css .= "  background-color: {$mdbSecondaryHover} !important;\n";
        $css .= "  border-color: {$mdbSecondaryHover} !important;\n";
        $css .= "  box-shadow: 0 8px 9px -4px {$mdbSecondary}4D, 0 4px 18px 0 {$mdbSecondary}33 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".text-secondary,\n";
        $css .= ".link-secondary {\n";
        $css .= "  color: {$mdbSecondary} !important;\n";
        $css .= "}\n\n";
        
        // Success
        $css .= "/* Success */\n";
        $css .= ".btn-success,\n";
        $css .= ".bg-success {\n";
        $css .= "  background-color: {$mdbSuccess} !important;\n";
        $css .= "  border-color: {$mdbSuccess} !important;\n";
        $css .= "  box-shadow: 0 4px 9px -4px {$mdbSuccess}80 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".btn-success:hover,\n";
        $css .= ".btn-success:focus {\n";
        $css .= "  background-color: {$mdbSuccessHover} !important;\n";
        $css .= "  border-color: {$mdbSuccessHover} !important;\n";
        $css .= "  box-shadow: 0 8px 9px -4px {$mdbSuccess}4D, 0 4px 18px 0 {$mdbSuccess}33 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".text-success,\n";
        $css .= ".link-success {\n";
        $css .= "  color: {$mdbSuccess} !important;\n";
        $css .= "}\n\n";
        
        // Danger
        $css .= "/* Danger */\n";
        $css .= ".btn-danger,\n";
        $css .= ".bg-danger {\n";
        $css .= "  background-color: {$mdbDanger} !important;\n";
        $css .= "  border-color: {$mdbDanger} !important;\n";
        $css .= "  box-shadow: 0 4px 9px -4px {$mdbDanger}80 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".btn-danger:hover,\n";
        $css .= ".btn-danger:focus {\n";
        $css .= "  background-color: {$mdbDangerHover} !important;\n";
        $css .= "  border-color: {$mdbDangerHover} !important;\n";
        $css .= "  box-shadow: 0 8px 9px -4px {$mdbDanger}4D, 0 4px 18px 0 {$mdbDanger}33 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".text-danger,\n";
        $css .= ".link-danger {\n";
        $css .= "  color: {$mdbDanger} !important;\n";
        $css .= "}\n\n";
        
        // Warning
        $css .= "/* Warning */\n";
        $css .= ".btn-warning,\n";
        $css .= ".bg-warning {\n";
        $css .= "  background-color: {$mdbWarning} !important;\n";
        $css .= "  border-color: {$mdbWarning} !important;\n";
        $css .= "  box-shadow: 0 4px 9px -4px {$mdbWarning}80 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".btn-warning:hover,\n";
        $css .= ".btn-warning:focus {\n";
        $css .= "  background-color: {$mdbWarningHover} !important;\n";
        $css .= "  border-color: {$mdbWarningHover} !important;\n";
        $css .= "  box-shadow: 0 8px 9px -4px {$mdbWarning}4D, 0 4px 18px 0 {$mdbWarning}33 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".text-warning,\n";
        $css .= ".link-warning {\n";
        $css .= "  color: {$mdbWarning} !important;\n";
        $css .= "}\n\n";
        
        // Info
        $css .= "/* Info */\n";
        $css .= ".btn-info,\n";
        $css .= ".bg-info {\n";
        $css .= "  background-color: {$mdbInfo} !important;\n";
        $css .= "  border-color: {$mdbInfo} !important;\n";
        $css .= "  box-shadow: 0 4px 9px -4px {$mdbInfo}80 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".btn-info:hover,\n";
        $css .= ".btn-info:focus {\n";
        $css .= "  background-color: {$mdbInfoHover} !important;\n";
        $css .= "  border-color: {$mdbInfoHover} !important;\n";
        $css .= "  box-shadow: 0 8px 9px -4px {$mdbInfo}4D, 0 4px 18px 0 {$mdbInfo}33 !important;\n";
        $css .= "}\n\n";
        
        $css .= ".text-info,\n";
        $css .= ".link-info {\n";
        $css .= "  color: {$mdbInfo} !important;\n";
        $css .= "}\n";
        
        // Chemin du fichier CSS à générer
        $cssFilePath = JPATH_ROOT . '/media/templates/administrator/atum_ahmanet/css/generated-colors.css';
        
        // Écrire le contenu dans le fichier
        file_put_contents($cssFilePath, $css);
        
        return true;
    }
    
    /**
     * Assombrit une couleur hexadécimale
     *
     * @param string $hex     Couleur hexadécimale
     * @param int    $percent Pourcentage d'assombrissement
     *
     * @return string Couleur hexadécimale assombrie
     */
    private static function darkenColor($hex, $percent)
    {
        // Supprimer le # si présent
        $hex = ltrim($hex, '#');
        
        // Convertir en RGB
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
        
        // Assombrir
        $r = max(0, $r - $r * $percent / 100);
        $g = max(0, $g - $g * $percent / 100);
        $b = max(0, $b - $b * $percent / 100);
        
        // Convertir en hex
        return '#' . sprintf('%02x%02x%02x', $r, $g, $b);
    }
}

// Exécuter la génération si le script est appelé directement
if (basename($_SERVER['SCRIPT_NAME']) === basename(__FILE__)) {
    // Définir JPATH_BASE si ce n'est pas déjà fait
    if (!defined('JPATH_BASE')) {
        define('JPATH_BASE', dirname(dirname(dirname(dirname(dirname(__FILE__))))));
        require_once JPATH_BASE . '/includes/defines.php';
    }
    
    // Charger le framework Joomla
    require_once JPATH_BASE . '/includes/framework.php';
    
    // Générer le fichier CSS
    AhmanetColorGenerator::generateCssFile();
    
    echo "Fichier CSS généré avec succès.";
}

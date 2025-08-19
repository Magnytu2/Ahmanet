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

// Fonction pour assombrir une couleur
function darkenColor($hex, $percent) {
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

// Calculer les couleurs hover (légèrement plus foncées)
$mdbPrimaryHover   = darkenColor($mdbPrimary, 5);
$mdbSecondaryHover = darkenColor($mdbSecondary, 5);
$mdbSuccessHover   = darkenColor($mdbSuccess, 5);
$mdbDangerHover    = darkenColor($mdbDanger, 5);
$mdbWarningHover   = darkenColor($mdbWarning, 5);
$mdbInfoHover      = darkenColor($mdbInfo, 5);

// Générer le CSS
header('Content-Type: text/css');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
?>

/* Styles générés dynamiquement pour les couleurs MDBootstrap */

/* Primary */
.btn-primary,
.bg-primary,
.header-item a[href*="option=com_messages"],
.header-item a[href^="http"].header-item-content {
  background-color: <?php echo $mdbPrimary; ?> !important;
  border-color: <?php echo $mdbPrimary; ?> !important;
  box-shadow: 0 4px 9px -4px <?php echo $mdbPrimary; ?>80 !important;
}

.btn-primary:hover,
.btn-primary:focus,
.header-item a[href*="option=com_messages"]:hover,
.header-item a[href*="option=com_messages"]:focus,
.header-item a[href^="http"].header-item-content:hover,
.header-item a[href^="http"].header-item-content:focus {
  background-color: <?php echo $mdbPrimaryHover; ?> !important;
  border-color: <?php echo $mdbPrimaryHover; ?> !important;
  box-shadow: 0 8px 9px -4px <?php echo $mdbPrimary; ?>4D, 0 4px 18px 0 <?php echo $mdbPrimary; ?>33 !important;
}

.text-primary,
.link-primary {
  color: <?php echo $mdbPrimary; ?> !important;
}

/* Secondary */
.btn-secondary,
.bg-secondary {
  background-color: <?php echo $mdbSecondary; ?> !important;
  border-color: <?php echo $mdbSecondary; ?> !important;
  box-shadow: 0 4px 9px -4px <?php echo $mdbSecondary; ?>80 !important;
}

.btn-secondary:hover,
.btn-secondary:focus {
  background-color: <?php echo $mdbSecondaryHover; ?> !important;
  border-color: <?php echo $mdbSecondaryHover; ?> !important;
  box-shadow: 0 8px 9px -4px <?php echo $mdbSecondary; ?>4D, 0 4px 18px 0 <?php echo $mdbSecondary; ?>33 !important;
}

.text-secondary,
.link-secondary {
  color: <?php echo $mdbSecondary; ?> !important;
}

/* Success */
.btn-success,
.bg-success {
  background-color: <?php echo $mdbSuccess; ?> !important;
  border-color: <?php echo $mdbSuccess; ?> !important;
  box-shadow: 0 4px 9px -4px <?php echo $mdbSuccess; ?>80 !important;
}

.btn-success:hover,
.btn-success:focus {
  background-color: <?php echo $mdbSuccessHover; ?> !important;
  border-color: <?php echo $mdbSuccessHover; ?> !important;
  box-shadow: 0 8px 9px -4px <?php echo $mdbSuccess; ?>4D, 0 4px 18px 0 <?php echo $mdbSuccess; ?>33 !important;
}

.text-success,
.link-success {
  color: <?php echo $mdbSuccess; ?> !important;
}

/* Danger */
.btn-danger,
.bg-danger {
  background-color: <?php echo $mdbDanger; ?> !important;
  border-color: <?php echo $mdbDanger; ?> !important;
  box-shadow: 0 4px 9px -4px <?php echo $mdbDanger; ?>80 !important;
}

.btn-danger:hover,
.btn-danger:focus {
  background-color: <?php echo $mdbDangerHover; ?> !important;
  border-color: <?php echo $mdbDangerHover; ?> !important;
  box-shadow: 0 8px 9px -4px <?php echo $mdbDanger; ?>4D, 0 4px 18px 0 <?php echo $mdbDanger; ?>33 !important;
}

.text-danger,
.link-danger {
  color: <?php echo $mdbDanger; ?> !important;
}

/* Warning */
.btn-warning,
.bg-warning {
  background-color: <?php echo $mdbWarning; ?> !important;
  border-color: <?php echo $mdbWarning; ?> !important;
  box-shadow: 0 4px 9px -4px <?php echo $mdbWarning; ?>80 !important;
}

.btn-warning:hover,
.btn-warning:focus {
  background-color: <?php echo $mdbWarningHover; ?> !important;
  border-color: <?php echo $mdbWarningHover; ?> !important;
  box-shadow: 0 8px 9px -4px <?php echo $mdbWarning; ?>4D, 0 4px 18px 0 <?php echo $mdbWarning; ?>33 !important;
}

.text-warning,
.link-warning {
  color: <?php echo $mdbWarning; ?> !important;
}

/* Info */
.btn-info,
.bg-info {
  background-color: <?php echo $mdbInfo; ?> !important;
  border-color: <?php echo $mdbInfo; ?> !important;
  box-shadow: 0 4px 9px -4px <?php echo $mdbInfo; ?>80 !important;
}

.btn-info:hover,
.btn-info:focus {
  background-color: <?php echo $mdbInfoHover; ?> !important;
  border-color: <?php echo $mdbInfoHover; ?> !important;
  box-shadow: 0 8px 9px -4px <?php echo $mdbInfo; ?>4D, 0 4px 18px 0 <?php echo $mdbInfo; ?>33 !important;
}

.text-info,
.link-info {
  color: <?php echo $mdbInfo; ?> !important;
}

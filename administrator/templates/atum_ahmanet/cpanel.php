<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum_Ahmanet
 *
 * @copyright   (C) 2023 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Language\Text;

$app = Factory::getApplication();
$wa  = $this->getWebAssetManager();

// Ne plus désactiver le style du template parent pour conserver ses variables et priorités
// $wa->disableStyle('template.active');

// Initialiser les variables CSS avec les couleurs MDBootstrap
$params = $app->getTemplate(true)->params;
$mdbPrimary = $params->get('mdb-primary', '#3B71CA');
$mdbSecondary = $params->get('mdb-secondary', '#9FA6B2');
$mdbSuccess = $params->get('mdb-success', '#14A44D');
$mdbDanger = $params->get('mdb-danger', '#DC4C64');
$mdbWarning = $params->get('mdb-warning', '#E4A11B');
$mdbInfo = $params->get('mdb-info', '#54B4D3');
$mdbLight = $params->get('mdb-light', '#FBFBFB');
$mdbDark = $params->get('mdb-dark', '#332D2D');

// Fonction pour assombrir une couleur de 5%
function darkenColor($hex, $percent = 5) {
    $hex = ltrim($hex, '#');
    $rgb = array_map('hexdec', str_split($hex, 2));
    
    foreach ($rgb as &$color) {
        $color = max(0, min(255, $color - ($color * ($percent / 100))));
        $color = round($color);
    }
    
    return '#' . implode('', array_map(function($c) { return str_pad(dechex($c), 2, '0', STR_PAD_LEFT); }, $rgb));
}

// Calculer les couleurs hover (5% plus foncées)
$mdbPrimaryHover = darkenColor($mdbPrimary);
$mdbSecondaryHover = darkenColor($mdbSecondary);
$mdbSuccessHover = darkenColor($mdbSuccess);
$mdbDangerHover = darkenColor($mdbDanger);
$mdbWarningHover = darkenColor($mdbWarning);
$mdbInfoHover = darkenColor($mdbInfo);
$mdbDarkHover = darkenColor($mdbDark);

// Récupérer la couleur du texte depuis les paramètres du template
$textDark = $params->get('text-dark', '#4f4f4f');

// Ajouter les styles CSS inline pour les variables et forcer la couleur du texte
$this->addStyleDeclaration("
:root {
  --mdb-primary: {$mdbPrimary};
  --mdb-secondary: {$mdbSecondary};
  --mdb-success: {$mdbSuccess};
  --mdb-danger: {$mdbDanger};
  --mdb-warning: {$mdbWarning};
  --mdb-info: {$mdbInfo};
  --mdb-light: {$mdbLight};
  --mdb-dark: {$mdbDark};
  --text-dark: {$textDark};
  
  /* Hover variants (5% darker) */
  --mdb-primary-hover: {$mdbPrimaryHover};
  --mdb-secondary-hover: {$mdbSecondaryHover};
  --mdb-success-hover: {$mdbSuccessHover};
  --mdb-danger-hover: {$mdbDangerHover};
  --mdb-warning-hover: {$mdbWarningHover};
  --mdb-info-hover: {$mdbInfoHover};
  --mdb-dark-hover: {$mdbDarkHover};
  
  /* RGB versions for opacity support */
  --mdb-primary-rgb: " . implode(', ', sscanf(ltrim($mdbPrimary, '#'), '%02x%02x%02x')) . ";
  --mdb-secondary-rgb: " . implode(', ', sscanf(ltrim($mdbSecondary, '#'), '%02x%02x%02x')) . ";
  --mdb-success-rgb: " . implode(', ', sscanf(ltrim($mdbSuccess, '#'), '%02x%02x%02x')) . ";
  --mdb-danger-rgb: " . implode(', ', sscanf(ltrim($mdbDanger, '#'), '%02x%02x%02x')) . ";
  --mdb-warning-rgb: " . implode(', ', sscanf(ltrim($mdbWarning, '#'), '%02x%02x%02x')) . ";
  --mdb-info-rgb: " . implode(', ', sscanf(ltrim($mdbInfo, '#'), '%02x%02x%02x')) . ";
  --mdb-light-rgb: " . implode(', ', sscanf(ltrim($mdbLight, '#'), '%02x%02x%02x')) . ";
  --mdb-dark-rgb: " . implode(', ', sscanf(ltrim($mdbDark, '#'), '%02x%02x%02x')) . ";
}

/* Styles directs pour forcer la couleur du texte sur la page d'accueil */
.container-title,
#content .container-title,
.page-title,
#content .page-title,
#content h1,
#content h2,
#content h3,
#content h4,
#content h5,
#content h6,
#content .card-header,
#content .card-title,
#content .card-body,
#content .cpanel-modules .card-header,
#content .cpanel-modules .card-title,
#content .cpanel-modules .card-body,
#content .cpanel-modules button span,
#content .cpanel-add-module span {
  color: var(--text-dark) !important;
}

/* Forcer la couleur sur les éléments enfants */
#content .container-title *,
#content .page-title *,
#content h1 *,
#content h2 *,
#content h3 *,
#content h4 *,
#content h5 *,
#content h6 * {
  color: var(--text-dark) !important;
}
");

// Enregistrer et charger les styles MDBootstrap et Material Icons
$wa->registerAndUseStyle('mdb', 'media/templates/administrator/atum_ahmanet/css/mdb.min.css');
$wa->registerAndUseStyle('roboto', 'media/templates/administrator/atum_ahmanet/css/roboto.css');
$wa->registerAndUseStyle('material-icons', 'media/templates/administrator/atum_ahmanet/css/material-icons.css');

// Enregistrer et charger les couleurs MDBootstrap personnalisées - ORDRE IMPORTANT
$wa->registerAndUseStyle('mdbootstrap-colors', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-colors.css');
$wa->registerAndUseStyle('template-colors', 'media/templates/administrator/atum_ahmanet/css/template-colors.css');
$wa->registerAndUseStyle('mdbootstrap-components', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-components.css');
$wa->registerAndUseStyle('template-custom', 'media/templates/administrator/atum_ahmanet/css/template-custom.css');

// Charger les styles personnalisés en dernier pour qu'ils aient priorité
$wa->registerAndUseStyle('user', 'media/templates/administrator/atum_ahmanet/css/user.css');
// ROLLBACK: désactivation temporaire des CSS qui forcent la couleur du texte
// $wa->registerAndUseStyle('text-color-fix', 'media/templates/administrator/atum_ahmanet/css/text-color-fix.css', [], ['weight' => 1500]);
// $wa->registerAndUseStyle('cpanel-text-fix', 'media/templates/administrator/atum_ahmanet/css/cpanel-text-fix.css', [], ['weight' => 2000]);
// $wa->registerAndUseStyle('direct-title-fix', 'media/templates/administrator/atum_ahmanet/css/direct-title-fix.css', [], ['weight' => 2500]);
// Désactivation du CSS conflictuel qui force la couleur du texte sur le cpanel
// $wa->registerAndUseStyle('force-text-color', 'media/templates/administrator/atum_ahmanet/css/force-text-color.css', [], ['weight' => 3000]);
$wa->registerAndUseStyle('logos', 'media/templates/administrator/atum_ahmanet/css/logos.css');

// Enregistrer et charger les scripts MDBootstrap
$wa->registerAndUseScript('mdb', 'media/templates/administrator/atum_ahmanet/js/mdb.min.js');
$wa->registerAndUseScript('template-custom', 'media/templates/administrator/atum_ahmanet/js/template-custom.js');
$wa->registerAndUseScript('blue-icons-replacer', 'media/templates/administrator/atum_ahmanet/js/blue-icons-replacer.js', [], ['defer' => true]);
$wa->registerAndUseScript('title-color-fix', 'media/templates/administrator/atum_ahmanet/js/title-color-fix.js');
$wa->registerAndUseScript('direct-title-fix', 'media/templates/administrator/atum_ahmanet/js/direct-title-fix.js');
$wa->registerAndUseScript('ultimate-title-fix', 'media/templates/administrator/atum_ahmanet/js/ultimate-title-fix.js');

// Inclure le fichier cpanel.php du template parent
include_once JPATH_THEMES . '/atum/cpanel.php';

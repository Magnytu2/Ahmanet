<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum_Ahmanet
 * @copyright   (C) 2025 POUSSIN Cyrille
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

/** @var Joomla\CMS\Document\HtmlDocument $this */

$app = Factory::getApplication();
$wa  = $this->getWebAssetManager();

// Ne plus désactiver le style du template parent pour utiliser ses variables CSS
// $wa->disableStyle('template.active');

// Détection de la page d'accueil avec une logique plus robuste
$menu = $app->getMenu();
$lang = $app->getLanguage();
$isHomePage = false;
$input = $app->input;

// Récupérer les paramètres de l'URL
$option = $input->getString('option', '');
$view = $input->getString('view', '');
$task = $input->getString('task', '');
$layout = $input->getString('layout', '');
$itemid = $input->getInt('Itemid', 0);
$uri = Uri::getInstance();
$path = $uri->getPath();

// Vérifier si nous sommes sur la page d'accueil avec plusieurs conditions
$isHomePage = (
    // Condition 1: Menu actif est le menu par défaut
    $menu->getActive() == $menu->getDefault() ||
    
    // Condition 2: URL simple sans paramètres ou avec paramètres minimaux
    (empty($option) && (empty($view) || $view === 'cpanel')) ||
    
    // Condition 3: Option com_cpanel explicite
    ($option === 'com_cpanel') ||
    
    // Condition 4: Chemin d'URL simple
    ($path === '/administrator/' || $path === '/administrator/index.php' || $path === '/administrator') ||
    
    // Condition 5: Pas d'option mais task=display
    (empty($option) && $task === 'display')
);

// Forcer la détection pour les tests
// $isHomePage = true; // Décommenter pour forcer la détection

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
// Récupérer la couleur de texte foncé depuis les paramètres du template
$textDark = $params->get('text-dark', '#4f4f4f');

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

// Ajouter les styles CSS inline pour les variables
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
}");

// Enregistrer et charger les styles MDBootstrap et Material Icons
$wa->registerAndUseStyle('mdb', 'media/templates/administrator/atum_ahmanet/css/mdb.min.css');
$wa->registerAndUseStyle('roboto', 'media/templates/administrator/atum_ahmanet/css/roboto.css');
$wa->registerAndUseStyle('material-icons', 'media/templates/administrator/atum_ahmanet/css/material-icons.css');

// Ajouter Material Icons Two-Tone depuis Google Fonts
$this->addHeadLink('https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone', 'stylesheet');

// Enregistrer et charger les couleurs MDBootstrap personnalisées - ORDRE IMPORTANT
$wa->registerAndUseStyle('mdbootstrap-colors', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-colors.css');
// $wa->registerAndUseStyle('mdbootstrap-components', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-components.css');
// $wa->registerAndUseStyle('home-page', 'media/templates/administrator/atum_ahmanet/css/home-page.css', [], ['weight' => 1200]); // Désactivé pour uniformiser les couleurs

// Utiliser la navigation d'origine d'Atum

// Charger les styles personnalisés en dernier pour qu'ils aient priorité
$wa->registerAndUseStyle('dashboard-icons', 'media/templates/administrator/atum_ahmanet/css/dashboard-icons.css');
$wa->registerAndUseStyle('user', 'media/templates/administrator/atum_ahmanet/css/user.css');
// Désactivation du fichier text-color-fix.css qui force les couleurs sombres
// $wa->registerAndUseStyle('text-color-fix', 'media/templates/administrator/atum_ahmanet/css/text-color-fix.css', [], ['weight' => 1500]);
$wa->registerAndUseStyle('logos', 'media/templates/administrator/atum_ahmanet/css/logos.css');
// ROLLBACK: désactivation temporaire des overrides homepage et couleurs forcées
// $wa->registerAndUseStyle('homepage-override', 'media/templates/administrator/atum_ahmanet/css/homepage-override.css', [], ['weight' => 3000]);
// $wa->registerAndUseStyle('force-elements-colors', 'media/templates/administrator/atum_ahmanet/css/force-elements-colors.css', [], ['weight' => 3500]);
// $wa->registerAndUseStyle('admin-colors-fix', 'media/templates/administrator/atum_ahmanet/css/admin-colors-fix.css', [], ['weight' => 5000]);

// Enregistrer et charger les scripts MDBootstrap
$wa->registerAndUseScript('mdb', 'media/templates/administrator/atum_ahmanet/js/mdb.min.js');
$wa->registerAndUseScript('template-custom', 'media/templates/administrator/atum_ahmanet/js/template-custom.js');
$wa->registerAndUseScript('blue-icons-replacer', 'media/templates/administrator/atum_ahmanet/js/blue-icons-replacer.js', [], ['defer' => true]);
$wa->registerAndUseScript('global-title-fix', 'media/templates/administrator/atum_ahmanet/js/global-title-fix.js');
// $wa->registerAndUseScript('home-page-fix', 'media/templates/administrator/atum_ahmanet/js/home-page-fix.js'); // Désactivé pour uniformiser les couleurs
// $wa->registerAndUseScript('main-page-direct', 'media/templates/administrator/atum_ahmanet/js/main-page-direct.js'); // Désactivé pour uniformiser les couleurs
// Script home-page-fix désactivé pour revenir à l'apparence native de la sidebar

// Ajouter les scripts pour la détection de la classe admin-homepage (remover désactivé)
// ROLLBACK: désactivation temporaire
// $wa->registerAndUseScript('homepage-class-detector', 'media/templates/administrator/atum_ahmanet/js/homepage-class-detector.js', [], ['defer' => true]);
// Script désactivé car il cause des problèmes avec les couleurs de la page d'accueil
// $wa->registerAndUseScript('homepage-class-remover', 'media/templates/administrator/atum_ahmanet/js/homepage-class-remover.js', [], ['defer' => true]);

// ROLLBACK: désactivation temporaire des correctifs couleur homepage (CSS/JS)
// $wa->registerAndUseScript('homepage-color-fixer', 'media/templates/administrator/atum_ahmanet/js/homepage-color-fixer.js', [], ['defer' => true]);
// $wa->registerAndUseStyle('homepage-colors', 'media/templates/administrator/atum_ahmanet/css/homepage-colors.css');
// $wa->registerAndUseScript('admin-colors-fixer', 'media/templates/administrator/atum_ahmanet/js/admin-colors-fixer.js', [], ['defer' => true]);

// Ajouter le script pour forcer l'application des variables CSS natives du template
$wa->registerAndUseScript('template-variables-enforcer', 'media/templates/administrator/atum_ahmanet/js/template-variables-enforcer.js');

// Ajouter le script pour faciliter le vidage des caches
$wa->registerAndUseScript('cache-clearer', 'media/templates/administrator/atum_ahmanet/js/cache-clearer.js');

// Ajouter le script de vérification de compatibilité navigateur
$wa->registerAndUseScript('browser-compatibility', 'media/templates/administrator/atum_ahmanet/js/browser-compatibility.js');

// Script spécifique à la page principale désactivé

// Utiliser la navigation d'origine d'Atum

// Styles spécifiques à la sidebar désactivés

// Inclure le fichier index.php du template parent
include_once JPATH_THEMES . '/atum/index.php';

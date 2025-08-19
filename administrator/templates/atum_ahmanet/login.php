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
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Uri\Uri;

$app  = Factory::getApplication();
$wa   = $this->getWebAssetManager();

// Désactiver le chargement du template.min.css du template parent
$wa->disableStyle('template.active');

// Enregistrer et charger les styles MDBootstrap et Material Icons
$wa->registerAndUseStyle('mdb', 'media/templates/administrator/atum_ahmanet/css/mdb.min.css');
$wa->registerAndUseStyle('roboto', 'media/templates/administrator/atum_ahmanet/css/roboto.css');
$wa->registerAndUseStyle('material-icons', 'media/templates/administrator/atum_ahmanet/css/material-icons.css');

// Enregistrer et charger les couleurs MDBootstrap personnalisées - ORDRE IMPORTANT
$wa->registerAndUseStyle('mdbootstrap-colors', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-colors.css');
$wa->registerAndUseStyle('template-colors', 'media/templates/administrator/atum_ahmanet/css/template-colors.css');
$wa->registerAndUseStyle('mdbootstrap-components', 'media/templates/administrator/atum_ahmanet/css/mdbootstrap-components.css');
$wa->registerAndUseStyle('template-custom', 'media/templates/administrator/atum_ahmanet/css/template-custom.css');
$wa->registerAndUseStyle('user', 'media/templates/administrator/atum_ahmanet/css/user.css');
$wa->registerAndUseStyle('logos', 'media/templates/administrator/atum_ahmanet/css/logos.css');

// Enregistrer et charger les scripts MDBootstrap
$wa->registerAndUseScript('mdb', 'media/templates/administrator/atum_ahmanet/js/mdb.min.js');
$wa->registerAndUseScript('template-custom', 'media/templates/administrator/atum_ahmanet/js/template-custom.js');
$wa->registerAndUseScript('icon-replacer', 'media/templates/administrator/atum_ahmanet/js/icon-replacer.js', [], ['defer' => true]);

// Logo file
$loginLogo = $this->params->get('loginLogo')
    ? Uri::root() . htmlspecialchars($this->params->get('loginLogo'), ENT_QUOTES)
    : Uri::root() . 'media/templates/administrator/atum/images/logos/login.svg';

$loginLogoAlt = empty($this->params->get('loginLogoAlt')) && empty($this->params->get('emptyLoginLogoAlt'))
    ? 'alt=""'
    : 'alt="' . htmlspecialchars($this->params->get('loginLogoAlt'), ENT_COMPAT, 'UTF-8') . '"';

// Inclure le fichier login.php du template parent
include_once JPATH_THEMES . '/atum/login.php';

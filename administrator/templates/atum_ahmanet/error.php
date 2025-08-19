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

$app = Factory::getApplication();
$wa  = $this->getWebAssetManager();

// Désactiver le chargement du template.min.css du template parent
$wa->disableStyle('template.active');

// Enregistrer et charger les styles MDBootstrap et Material Icons
$wa->registerAndUseStyle('mdb', 'media/templates/administrator/atum_ahmanet/css/mdb.min.css');
$wa->registerAndUseStyle('roboto', 'media/templates/administrator/atum_ahmanet/css/roboto.css');
$wa->registerAndUseStyle('material-icons', 'media/templates/administrator/atum_ahmanet/css/material-icons.css');
$wa->registerAndUseStyle('template-custom', 'media/templates/administrator/atum_ahmanet/css/template-custom.css');
$wa->registerAndUseStyle('user', 'media/templates/administrator/atum_ahmanet/css/user.css');

// Enregistrer et charger les scripts MDBootstrap
$wa->registerAndUseScript('mdb', 'media/templates/administrator/atum_ahmanet/js/mdb.min.js');
$wa->registerAndUseScript('template-custom', 'media/templates/administrator/atum_ahmanet/js/template-custom.js');
$wa->registerAndUseScript('icon-replacer', 'media/templates/administrator/atum_ahmanet/js/icon-replacer.js', [], ['defer' => true]);

// Inclure le fichier error.php du template parent
include_once JPATH_THEMES . '/atum/error.php';

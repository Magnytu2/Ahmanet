<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_title
 *
 * @copyright   (C) 2010 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Récupérer la couleur de texte depuis les paramètres du template
$app = \Joomla\CMS\Factory::getApplication();
$params = $app->getTemplate(true)->params;
$textDark = $params->get('text-dark', '#4f4f4f');
?>
<?php if (!empty($title)) : ?>
<div class="d-flex align-items-center">
    <div class="container-title" style="color: <?php echo $textDark; ?> !important;">
        <span style="color: <?php echo $textDark; ?> !important;"><?php echo $title; ?></span>
    </div>
</div>
<?php endif; ?>

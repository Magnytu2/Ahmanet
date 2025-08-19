<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  mod_user
 *
 * @copyright   (C) 2019 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Session\Session;
use Joomla\CMS\Uri\Uri;

$hideLinks = $app->getInput()->getBool('hidemainmenu');

if ($hideLinks) {
    return;
}

$tParams           = $app->getTemplate(true)->params;
// Not all templates support a colorScheme
$colorSchemeSwitch = !!$tParams->get('colorScheme');
?>
<div class="header-item-content dropdown header-profile">
    <button class="btn btn-primary dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" type="button"
    data-bs-auto-close="outside" title="<?php echo Text::_('MOD_USER_MENU'); ?>">
        <i class="far fa-user-circle me-1"></i>
        <span class="d-none d-md-inline">
            <?php echo Text::_('MOD_USER_MENU'); ?>
        </span>
    </button>
    <div class="dropdown-menu dropdown-menu-end shadow-5">
        <div class="dropdown-header">
            <i class="far fa-user-circle me-2"></i>
            <?php echo Text::sprintf('MOD_USER_TITLE', $user->name); ?>
        </div>
        <?php $uri   = Uri::getInstance(); ?>
        <?php $route = 'index.php?option=com_users&task=user.edit&id=' . $user->id . '&return=' . base64_encode($uri) . '#attrib-user_details'; ?>
        <a class="dropdown-item" href="<?php echo Route::_($route); ?>">
            <i class="far fa-user me-2"></i>
            <?php echo Text::_('MOD_USER_EDIT_ACCOUNT'); ?>
        </a>
        <?php if ($colorSchemeSwitch) : ?>
            <button type="button" class="dropdown-item" data-color-scheme-switch>
                <span class="d-dark-scheme-none">
                    <i class="fas fa-sun me-2"></i> <?php echo Text::_('MOD_USER_LIGHTDARK_MODE'); ?>
                </span>
                <span class="d-light-scheme-none">
                    <i class="fas fa-moon me-2"></i> <?php echo Text::_('MOD_USER_LIGHTDARK_MODE'); ?>
                </span>
            </button>
        <?php endif; ?>
        <?php $route = 'index.php?option=com_users&task=user.edit&id=' . $user->id . '&return=' . base64_encode($uri) . '#attrib-accessibility'; ?>
        <a class="dropdown-item" href="<?php echo Route::_($route); ?>">
            <i class="fas fa-universal-access me-2"></i>
            <?php echo Text::_('MOD_USER_ACCESSIBILITY_SETTINGS'); ?>
        </a>
        <?php $route = 'index.php?option=com_login&task=logout&amp;' . Session::getFormToken() . '=1'; ?>
        <a class="dropdown-item" href="<?php echo Route::_($route); ?>">
            <i class="fas fa-power-off me-2"></i>
            <?php echo Text::_('JLOGOUT'); ?>
        </a>
    </div>
</div>

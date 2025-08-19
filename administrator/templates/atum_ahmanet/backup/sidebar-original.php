<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum
 * @copyright   (C) 2016 Open Source Matters, Inc.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @note        Sauvegarde du code original de la sidebar du template Atum
 */

// Code original de la sidebar du template Atum
?>

<?php // Sidebar ?>
<?php if (!$hiddenMenu) : ?>
    <?php HTMLHelper::_('bootstrap.collapse', '.toggler-burger'); ?>
    <button class="navbar-toggler toggler-burger collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-wrapper" aria-controls="sidebar-wrapper" aria-expanded="false" aria-label="<?php echo Text::_('JTOGGLE_SIDEBAR_MENU'); ?>">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div id="sidebar-wrapper" class="sidebar-wrapper sidebar-menu" <?php echo $hiddenMenu ? 'data-hidden="' . $hiddenMenu . '"' : ''; ?>>
        <div id="sidebarmenu" class="sidebar-sticky">
            <div class="sidebar-toggle item item-level-1">
                <a id="menu-collapse" href="#" aria-label="<?php echo Text::_('JTOGGLE_SIDEBAR_MENU'); ?>">
                    <span id="menu-collapse-icon" class="<?php echo $sidebarState === 'closed' ? 'icon-toggle-on' : 'icon-toggle-off'; ?> icon-fw" aria-hidden="true"></span>
                    <span class="sidebar-item-title"><?php echo Text::_('JTOGGLE_SIDEBAR_MENU'); ?></span>
                </a>
            </div>
            <jdoc:include type="modules" name="menu" style="none" />
        </div>
    </div>
<?php endif; ?>

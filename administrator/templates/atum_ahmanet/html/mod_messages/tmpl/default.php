<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  mod_messages
 *
 * @copyright   (C) 2019 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;

$hideLinks = $app->getInput()->getBool('hidemainmenu');

if ($hideLinks || $countUnread < 1) {
    return;
}

$route = 'index.php?option=com_messages&view=messages';
?>
<a class="btn btn-primary d-flex align-items-center mx-2" href="<?php echo Route::_($route); ?>" title="<?php echo Text::_('MOD_MESSAGES_PRIVATE_MESSAGES'); ?>">
    <i class="far fa-envelope me-1"></i>
    <span class="badge badge-danger ms-1 me-1"><?php echo $countUnread; ?></span>
    <span class="d-none d-md-inline">
        <?php echo Text::_('MOD_MESSAGES_PRIVATE_MESSAGES'); ?>
    </span>
</a>

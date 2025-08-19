<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  mod_frontend
 *
 * @copyright   (C) 2019 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

?>
<a href="<?php echo Uri::root(); ?>" class="btn btn-success d-flex align-items-center mx-2"
    title="<?php echo Text::sprintf('MOD_FRONTEND_PREVIEW', $sitename); ?>"
    target="_blank">
    <i class="fas fa-external-link-alt me-1"></i>
    <span class="d-none d-md-inline">
        <?php echo HTMLHelper::_('string.truncate', $sitename, 28, false, false); ?>
    </span>
</a>

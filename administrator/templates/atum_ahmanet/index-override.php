<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum_Ahmanet
 *
 * @copyright   (C) 2025 POUSSIN Cyrille
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;

/** @var Joomla\CMS\Document\HtmlDocument $this */

$app   = Factory::getApplication();
$lang  = $app->getLanguage();
$input = $app->input;
$wa    = $this->getWebAssetManager();

// Detecting Active Variables
$option = $input->get('option', '');
$view   = $input->get('view', '');
$layout = $input->get('layout', 'default');
$task   = $input->get('task', 'display');

// Browsers support SVG favicons
$this->addHeadLink(Uri::root() . 'media/templates/administrator/atum/favicon.svg', 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(Uri::root() . 'media/templates/administrator/atum/favicon-dark.svg', 'icon', 'rel', ['type' => 'image/svg+xml', 'media' => '(prefers-color-scheme: dark)']);
$this->addHeadLink(Uri::root() . 'media/templates/administrator/atum/favicon-pinned.svg', 'mask-icon', 'rel', ['color' => '#bbbbbb']);
$this->addHeadLink(Uri::root() . 'media/templates/administrator/atum/favicon.ico', 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);

// Getting user accessibility settings
$highlightMenu = $app->getIdentity()->getParam('administrator.highlightMenu', 0);

// Template params
$logoBrandLarge  = $this->params->get('logoBrandLarge')
    ? Uri::root() . htmlspecialchars($this->params->get('logoBrandLarge'), ENT_QUOTES)
    : Uri::root() . 'media/templates/administrator/atum/images/logos/brand-large.svg';
$logoBrandSmall = $this->params->get('logoBrandSmall')
    ? Uri::root() . htmlspecialchars($this->params->get('logoBrandSmall'), ENT_QUOTES)
    : Uri::root() . 'media/templates/administrator/atum/images/logos/brand-small.svg';

$logoBrandLargeAlt = empty($this->params->get('logoBrandLargeAlt')) && empty($this->params->get('emptyLogoBrandLargeAlt'))
    ? 'alt=""'
    : 'alt="' . htmlspecialchars($this->params->get('logoBrandLargeAlt'), ENT_COMPAT, 'UTF-8') . '"';
$logoBrandSmallAlt = empty($this->params->get('logoBrandSmallAlt')) && empty($this->params->get('emptyLogoBrandSmallAlt'))
    ? 'alt=""'
    : 'alt="' . htmlspecialchars($this->params->get('logoBrandSmallAlt'), ENT_COMPAT, 'UTF-8') . '"';

// Get the hue value
preg_match('#^hsla?\(([0-9]+)[\D]+([0-9]+)[\D]+([0-9]+)[\D]+([0-9](?:.\d+)?)?\)$#i', $this->params->get('hue', 'hsl(214, 63%, 20%)'), $matches);

// Enable assets
$wa->usePreset('template.atum.' . ($this->direction === 'rtl' ? 'rtl' : 'ltr'))
    ->useStyle('template.active.language')
    ->useStyle('template.user')
    ->addInlineStyle(':root {
		--hue: ' . $matches[1] . ';
		--template-bg-light: ' . $this->params->get('bg-light', '#f0f4fb') . ';
		--template-text-dark: ' . $this->params->get('text-dark', '#495057') . ';
		--template-text-light: ' . $this->params->get('text-light', '#ffffff') . ';
		--template-link-color: ' . $this->params->get('link-color', '#2a69b8') . ';
		--template-link-hover-color: ' . $this->params->get('link-hover-color', '#59afff') . ';
		--template-special-color: ' . $this->params->get('special-color', '#001B4C') . ';
	}');

// Override 'template.active' asset to avoid 'js/template.js' being loaded
$wa->registerAndUseStyle('template.active', '', [], [], ['template.atum.' . ($this->direction === 'rtl' ? 'rtl' : 'ltr')]);

// Set some meta data
$this->setMetaData('viewport', 'width=device-width, initial-scale=1');

$monochrome = (bool) $this->params->get('monochrome');

// Add cookie alert message
Text::script('JGLOBAL_WARNCOOKIES');

// @see administrator/templates/atum/html/layouts/status.php
$statusModules = HTMLHelper::_('bootstrap.collapse', '.header-status .navbar-nav');

// Set the bar classes
$barClass = $this->params->get('headerbar-fixed', 1) ? 'position-sticky' : 'mt-4';

// Logo file
$logo = $this->baseurl . '/templates/' . $this->template . '/images/logo.svg';

// Accessibility settings
$highlightMenu = $app->getIdentity()->getParam('administrator.highlightMenu', 0);

// Defer fontawesome for increased performance
if (JDEBUG || $app->get('debug')) {
    $wa->disableScript('template.atum');
    $wa->registerAndUseScript('template.atum', 'media/templates/administrator/atum/js/template.js', [], ['defer' => true]);
}

// Set some meta data
$this->setMetaData('viewport', 'width=device-width, initial-scale=1');

$this->getPreloadManager()->prefetch($this->baseurl . '/media/templates/administrator/atum/js/template.min.js', ['as' => 'script']);

// Opacity-boost for the status module
$statusmoduleOpacityBoost = $this->params->get('statusmoduleOpacityBoost', 0);

// Opacity-boost for the header
$headerOpacityBoost = $this->params->get('headerOpacityBoost', 0);

// Opacity-boost for the sidebar
$sidebarOpacityBoost = $this->params->get('sidebarOpacityBoost', 0);

// Opacity-boost for the toolbar
$toolbarOpacityBoost = $this->params->get('toolbarOpacityBoost', 0);

// Opacity-boost for the title module
$titlemoduleOpacityBoost = $this->params->get('titlemoduleOpacityBoost', 0);

// Sidebar collapsed
$sidebarState = $app->input->cookie->get('atumSidebarState', '');

// Menu classes
$hiddenMenu = $app->input->cookie->get('atumSidebarHidden', 0) == 1 ? 'closed' : '';

// Provide access to the layout params
// $this->setLayout('default'); // Cette méthode n'existe pas dans Joomla 5.3.2
// $layoutParams = $this->getLayoutParams(); // Cette méthode n'existe pas dans Joomla 5.3.2

// Page title
$title = $this->getTitle();

// Sidebar Opacity Boost
$sidebarOpacityBoost = $this->params->get('sidebarOpacityBoost', 0);

// Dashboard special case
$cpanel = false;

if ($option === 'com_cpanel' || $option === 'com_admin' && $view === 'help') {
    $cpanel = true;
}

// Display the header
// La méthode sublayout() n'existe pas dans Joomla 5.3.2, utilisation de l'alternative standard
$headerData = [
    'logoBrandLarge'  => $logoBrandLarge,
    'logoBrandSmall'  => $logoBrandSmall,
    'logoBrandLargeAlt'  => $logoBrandLargeAlt,
    'logoBrandSmallAlt'  => $logoBrandSmallAlt,
    'statusModules'   => $statusModules,
    'headerModules'   => $this->countModules('status'),
    'barClass'        => $barClass,
    'headerOpacityBoost' => $headerOpacityBoost,
    'statusmoduleOpacityBoost' => $statusmoduleOpacityBoost,
];
echo LayoutHelper::render('html.layouts.atum.header', $headerData);
?>

<?php // Wrapper ?>
<div id="wrapper" class="d-flex wrapper<?php echo $hiddenMenu ? '0' : ''; ?> <?php echo $sidebarState; ?>">
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

    <?php // container-fluid ?>
    <div class="container-fluid container-main">
        <?php if (!$cpanel) : ?>
            <?php // Subheader ?>
            <?php HTMLHelper::_('bootstrap.collapse', '.toggler-toolbar'); ?>
            <button class="navbar-toggler toggler-toolbar toggler-burger collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subhead-container" aria-controls="subhead-container" aria-expanded="false" aria-label="<?php echo Text::_('TPL_ATUM_TOOLBAR'); ?>">
                <span class="toggler-toolbar-icon"></span>
            </button>
            <div id="subhead-container" class="subhead mb-3">
                <div id="container-collapse" class="container-collapse"></div>
                <div class="row">
                    <div class="col-md-12">
                        <jdoc:include type="modules" name="toolbar" style="none" />
                    </div>
                </div>
            </div>
        <?php endif; ?>
        <section id="content" class="content">
            <?php // Begin Content ?>
            <jdoc:include type="modules" name="top" style="html5" />
            <div class="row">
                <div class="col-md-12">
                    <h1><?php echo $title; ?></h1>
                </div>
            </div>
            <div class="lower-height">
                <jdoc:include type="message" />
                <jdoc:include type="component" />
            </div>
            <?php // End Content ?>
        </section>
    </div>
</div>
<jdoc:include type="modules" name="debug" style="none" />
</body>
</html>

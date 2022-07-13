<?php
/**
 * AwesomeMotive Plugin
 *
 * @since             1.0
 * @package           awesomemotive-wp-plugin
 *
 * @wordpress-plugin
 * Plugin Name:       AwesomeMotive Plugin
 * Description:       Plugin that retrieves data from a remote API, and makes an admin-only accessible Vue app with three tabs: one that displays a graph, one that displays a table  and one that has a settings form.
 * Version:           1.0.0
 * Author:            Arun Chaitanya Jami
 * Author URI:        https://github.com/arunchaitanyajami
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       awesomemotive-wp-plugin
 * Domain Path:       /languages
 */

namespace AwesomeMotive;

/**
 * If this file is called directly, abort.
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'AWESOMEMOTIVE_WP_PLUGIN_VERSION', '1.0.0' );

/**
 * Call back function that runs during plugin activation.
 */
function activate_plugin() {

}

register_activation_hook( __FILE__, __NAMESPACE__ . '\\activate_plugin' );

/**
 * Call back function that runs during plugin deactivation.
 */
function deactivate_plugin() {

}

register_deactivation_hook( __FILE__, __NAMESPACE__ . '\\deactivate_plugin' );

/**
 * Composer Autoload file.
 */
if ( is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
	include __DIR__ . '/vendor/autoload.php';
}

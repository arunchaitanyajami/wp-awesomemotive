<?php
/**
 * AwesomeMotive Plugin
 *
 * @since             1.0
 * @package           AwesomeMotive
 *
 * @wordpress-plugin
 * Plugin Name:       AwesomeMotive Plugin
 * Description:       Plugin that retrieves data from a remote API, and makes an admin-only accessible Vue app with three tabs: one that displays a graph, one that displays a table  and one that has a settings form.
 * Version:           1.0.4
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
define( 'AWESOMEMOTIVE_WP_PLUGIN_VERSION', '1.0.4' );
define( 'AWESOMEMOTIVE_PREFIX', 'wpam_' );
define( 'AWESOMEMOTIVE_SITE_OPTION', 'test_project_option' );
define( 'AWESOMEMOTIVE_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'AWESOMEMOTIVE_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * Call back function that runs during plugin activation.
 */
function activate_plugin() {

	/**
	 * Set default options to the plugin.
	 */
	update_option(
		AWESOMEMOTIVE_SITE_OPTION,
		array(
			'num_rows'   => 5,
			'human_date' => true,
			'emails'     => array(
				get_bloginfo( 'admin_email' ),
			),
		)
	);
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\\activate_plugin' );

/**
 * Call back function that runs during plugin deactivation.
 */
function deactivate_plugin() {
	/**
	 * Delete options on de-activation the plugin.
	 */
	delete_option( AWESOMEMOTIVE_SITE_OPTION );
}

register_deactivation_hook( __FILE__, __NAMESPACE__ . '\\deactivate_plugin' );

/**
 * Composer Autoload file.
 */
if ( is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
	include __DIR__ . '/vendor/autoload.php';
}

use AwesomeMotive\Admin\AjaxEndpoint;
use AwesomeMotive\Admin\Page;

/**
 * Initialize cron job.
 */
( new CronJob() )->init();

/**
 * Create admin menu page.
 */
( new Page() )->init();

/**
 * Load Ajax Endpoints.
 */
( new AjaxEndpoint() )->init( 'all_data', 'AwesomeMotive\all_data_endpoint_ajax_callback' );
( new AjaxEndpoint() )->init( 'data_endpoint', 'AwesomeMotive\data_endpoint_ajax_callback' );
( new AjaxEndpoint() )->init( 'all_settings_endpoint', 'AwesomeMotive\get_all_settings_ajax_callback' );

/**
 * Loads and defines the internationalization files for this plugin so that it is ready for translation.
 */
function load_textdomain() {
	load_plugin_textdomain(
		'awesomemotive-wp-plugin',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages/'
	);
}

add_action( 'init', __NAMESPACE__ . '\\load_textdomain' );

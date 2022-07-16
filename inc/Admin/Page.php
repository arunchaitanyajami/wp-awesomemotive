<?php
/**
 * Creat admin page to display graph, tables and settings.
 *
 * @link       https://github.com/arunchaitanyajami
 * @since      1.0.3
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/admin
 */

namespace AwesomeMotive\Admin;

/**
 * Class Page.
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/admin
 */
class Page {
	/**
	 * Page Slug.
	 *
	 * @var string
	 */
	private string $slug = 'awesome-motive';

	/**
	 * Manage Compatability.
	 *
	 * @var string
	 */
	private string $capability = 'manage_options';

	/**
	 * Page Initiation.
	 */
	public function init() {
		add_action( 'admin_enqueue_scripts', array( $this, 'assets' ) );
		add_action( 'admin_menu', array( $this, 'menu' ) );
	}

	/**
	 * Add menu to admin Interface.
	 */
	public function menu() {
		add_menu_page(
			__( 'Awesome Motive Menu', 'awesomemotive-wp-plugin' ),
			__( 'Awesome Motive', 'awesomemotive-wp-plugin' ),
			$this->capability,
			$this->slug,
			array( $this, 'layout' ),
			'dashicons-tagcloud',
			6
		);
	}

	/**
	 * Layout to display when page is loaded.
	 */
	public function layout() {
		if ( is_file( AWESOMEMOTIVE_DIR_PATH . 'inc/templates/admin.php' ) ) {
			include_once AWESOMEMOTIVE_DIR_PATH . 'inc/templates/admin.php';
		}
	}

	/**
	 * Enqueue Assets to the Page.
	 */
	public function assets() {
		$page = filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING );
		if ( $this->slug !== $page ) {
			return;
		}

		$asset_loader = new AssetLoader( 'AwesomeMotive', AWESOMEMOTIVE_WP_PLUGIN_VERSION );

		$asset_loader->enqueue_scripts();
		$asset_loader->enqueue_styles();
	}
}

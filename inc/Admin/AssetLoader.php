<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/arunchaitanyajami
 * @since      1.0.3
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/admin
 */

namespace AwesomeMotive\Admin;

/**
 * The admin-specific functionality of the plugin.
 *
 * Enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/Admin
 */
class AssetLoader {
	/**
	 * Plugin Name.
	 *
	 * @var string
	 */
	private string $plugin_name;

	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	private string $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version The version of this plugin.
	 *
	 * @since 1.0.3
	 */
	public function __construct( string $plugin_name, string $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since 1.0.3
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, AWESOMEMOTIVE_DIR_URL . 'build/index.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since 1.0.3
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, AWESOMEMOTIVE_DIR_URL . 'build/index.js', array( 'jquery', 'wp-element' ), $this->version, true );
	}
}

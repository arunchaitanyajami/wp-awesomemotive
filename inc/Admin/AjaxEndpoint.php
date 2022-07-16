<?php
/**
 * Ajax Endpoint to fetch, update and delete information.
 *
 * @link       https://github.com/arunchaitanyajami
 * @since      1.0.4
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/admin
 */

namespace AwesomeMotive\Admin;

/**
 * Class AjaxEndpoint.
 *
 * @link       https://github.com/arunchaitanyajami
 * @since      1.0.4
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/admin
 */
class AjaxEndpoint {

	/**
	 * Ajax Callback.
	 *
	 * @var callable
	 */
	private $callback;

	/**
	 * Initiate the class.
	 *
	 * @param string   $name Name of ajax action.
	 * @param callable $callback Call back.
	 */
	public function init( string $name, callable $callback ) {
		$ajax_hook_name        = wp_sprintf( 'wp_ajax_', esc_html( $name ) );
		$nopriv_ajax_hook_name = wp_sprintf( 'wp_ajax_nopriv_', esc_html( $name ) );
		add_action( $ajax_hook_name, array( $this, 'callback' ) );
		add_action( $nopriv_ajax_hook_name, array( $this, 'callback' ) );

		$this->callback = $callback;
	}

	/**
	 * Call back function.
	 */
	public function callback() {
		$nonce_name = esc_attr( AWESOMEMOTIVE_PREFIX . 'nonce' );
		$nonce      = filter_input( INPUT_POST, $nonce_name, FILTER_SANITIZE_STRING );
		$callback   = $this->callback;

		if ( ! wp_verify_nonce( $nonce, 'awesomemotive-wp-plugin' ) ) {
			die( 'Nonce value cannot be verified.' );
		}

		if ( ! is_user_logged_in() || ! user_can_access_admin_page() || ! current_user_can( 'manage_options' ) ) {
			die( 'You are not allowed to perform this action' );
		}
		if ( ! is_callable( $callback ) ) {
			die( 'Unable to call the function | method provided' );
		}

		echo wp_json_encode( $callback() );

		// Always die in functions echoing ajax content.
		die();
	}
}

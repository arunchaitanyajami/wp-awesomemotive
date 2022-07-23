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
	 * @var string
	 */
	private string $callback;

	/**
	 * Initiate the class.
	 *
	 * @param string   $name Name of ajax action.
	 * @param callable $callback Call back.
	 */
	public function init( string $name, callable $callback ) {
		$ajax_hook_name        = wp_sprintf( 'wp_ajax_%s', esc_html( $name ) );
		$nopriv_ajax_hook_name = wp_sprintf( 'wp_ajax_nopriv_%s', esc_html( $name ) );

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
		$type       = filter_input( INPUT_POST, 'type', FILTER_SANITIZE_STRING );
		$data       = filter_input( INPUT_POST, 'data', FILTER_DEFAULT ); //@phpcs:ignore
		if ( ! empty( $data ) ) {
			$data = (array) json_decode( stripslashes( $data ) );
		}


		if ( ! wp_verify_nonce( $nonce, 'awesomemotive-wp-plugin' ) ) {
			echo wp_json_encode(
				array(
					'status'  => 400,
					'message' => esc_html( 'Nonce value cannot be verified.' ),
				)
			);
			wp_die();
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			echo wp_json_encode(
				array(
					'status'  => 400,
					'message' => esc_html( 'You are not allowed to perform this action' ),
				)
			);
			wp_die();
		}

		if ( ! is_callable( $callback ) ) {
			echo wp_json_encode(
				array(
					'status'  => 400,
					'message' => wp_sprintf( 'Unable to call the function | method provided %s', esc_html( $callback ) ),
				)
			);
			wp_die();
		}

		/**
		 * Data that returns from call back can be anything but wp_json_encode 1st perimeter is of type mixed.
		 */
		$response = call_user_func( $callback, $type, $data ?: array() ); //@phpcs:ignore
		if ( empty( $response ) ) {
			echo wp_json_encode(
				array(
					'status'  => 404,
					'message' => 'Unable to Process data',
				)
			);
			wp_die();
		}

		echo wp_json_encode( $response );

		// Always die in functions echoing ajax content.
		wp_die();
	}
}

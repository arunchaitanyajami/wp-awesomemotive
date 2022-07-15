<?php
/**
 * Schedule cron to fetch data from external endpoint on a hourly basis.
 *
 * @package AwesomeMotive
 * @since 1.0.2
 */

namespace AwesomeMotive;

/**
 * Class CronJob.
 *
 * @package AwesomeMotive
 */
class CronJob {

	/**
	 * Initiate the cron job.
	 */
	public function init() {

		/**
		 * Schedule custom cron Intervals.
		 */
		add_filter( 'cron_schedules', array( $this, 'add_cron_interval' ) );

		/**
		 * Hooks Name.
		 */
		$hook = wp_sprintf( '%scron_fetch_data', esc_html( AWESOMEMOTIVE_PREFIX ) );

		/**
		 * Register custom action to fetch data.
		 */
		add_action( $hook, array( $this, 'fetch_data' ) );

		/**
		 * Schedule cron on hourly base.
		 */
		$recurrence = wp_sprintf( '%sone_hour', esc_html( AWESOMEMOTIVE_PREFIX ) );
		$this->schedule_cron( $hook, $recurrence );
	}

	/**
	 * Schedule cron event.
	 *
	 * @param string $hook_name Hook name.
	 * @param string $recurrence Event subsequent recurrence.
	 */
	public function schedule_cron( string $hook_name, string $recurrence ) {
		if ( ! wp_next_scheduled( $hook_name ) ) {
			wp_schedule_event( time(), $recurrence, $hook_name );
		}
	}

	/**
	 * Create custom schedules to run cron events.
	 *
	 * @param array $schedules Existing schedules thats already registered in WP.
	 *
	 * @return array
	 */
	public function add_cron_interval( array $schedules ): array {
		$schedule_key               = wp_sprintf( '%sone_hour', esc_attr( AWESOMEMOTIVE_PREFIX ) );
		$schedules[ $schedule_key ] = array(
			'interval' => 60 * 60,
			'display'  => esc_html__( 'Awesome Motive Cron Store: Every One Hour', 'awesomemotive-wp-plugin' ),
		);

		$filter_name = wp_sprintf( '%scron_schedules', esc_attr( AWESOMEMOTIVE_PREFIX ) );

		return apply_filters( $filter_name, $schedules );
	}

	/**
	 * Fetch data from miusage.com endpoint and store in options.
	 *
	 * @return bool
	 */
	public function fetch_data(): bool {
		$data = $this->load_request();
		if ( empty( $data ) ) {
			return false;
		}

		$options_key = wp_sprintf( '%smiusage_data', esc_attr( AWESOMEMOTIVE_PREFIX ) );
		return update_option( $options_key, $data );
	}

	/**
	 * Lead data from remote endpoint.
	 *
	 * @return object
	 */
	private function load_request(): object {
		$url  = 'https://miusage.com/v1/challenge/2/static/';
		$json = array();

		try {
			$response = wp_safe_remote_get(
				esc_url_raw( $url ),
				array(
					'headers' => array(
						'Accept' => 'application/json',
					),
				)
			);
			if ( ( ! is_wp_error( $response ) ) && ( 200 === wp_remote_retrieve_response_code( $response ) ) ) {
				$body = wp_remote_retrieve_body( $response );
				$json = json_decode( $body );
			}
		} catch ( \Exception $ex ) {
			$json = array();
		}

		return (object) $json;
	}
}

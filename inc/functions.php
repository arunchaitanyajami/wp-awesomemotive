<?php
/**
 * Common functions file.
 *
 * @link       https://github.com/arunchaitanyajami
 * @since      1.0.4
 *
 * @package    AwesomeMotive
 * @subpackage AwesomeMotive/admin
 */

namespace AwesomeMotive;

/**
 * Retrieve data for miusage data that store in options table.
 * This information is stored or changes every one hour by cronjob that runs every one hour interval.
 *
 * @return false|mixed|void
 */
function data_endpoint_ajax_callback() {
	$options_key = wp_sprintf( '%smiusage_data', esc_attr( AWESOMEMOTIVE_PREFIX ) );

	return get_option( $options_key, array() );
}

/**
 * Get all settings.
 *
 * @param string $type Type to fetch or update.
 * @param array  $data Data to pass on update.
 *
 * @return false|mixed|void
 */
function get_all_settings_ajax_callback( string $type = 'get', array $data = array() ) {
	$settings = get_option( AWESOMEMOTIVE_SITE_OPTION, array() );
	if ( ! empty( $data ) ) {
		foreach ( $data as $key => $value ) {
			$settings[ $key ] = $value;
		}
	}

	if ( 'update' === $type ) {
		update_option( AWESOMEMOTIVE_SITE_OPTION, $settings );
	}

	return $settings;
}

/**
 * Get all data endpoint including miusage data and settings data.
 *
 * @return false|mixed|void
 */
function all_data_endpoint_ajax_callback() {
	$all_data           = data_endpoint_ajax_callback();
	$all_data->settings = get_all_settings_ajax_callback();

	return $all_data;
}

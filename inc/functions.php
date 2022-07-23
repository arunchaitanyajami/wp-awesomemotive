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

	( new CronJob() )->fetch_data();

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
	if ( 'get' === $type ) {
		return array(
			'status'  => 200,
			'message' => 'Data fetched successfully',
			'data'    => $settings,
		);
	}

	$filter_data = array_filter(
		$data,
		function( $v ) {
			return ! is_null( $v );
		} 
	);

	if ( empty( $filter_data ) ) {
		return array(
			'status'  => 403,
			'message' => 'Unable to Process request, empty data provided',
		);
	}

	$allowed_keys = array(
		'num_rows',
		'human_date',
		'emails',
	);

	$is_data_valid = true;
	foreach ( $data as $key => $value ) {
		if ( ! in_array( $key, $allowed_keys, true ) ) {
			$is_data_valid = false;
			break;
		}

		if ( 'num_rows' === $key ) {
			$filtered_value = filter_var( $value, FILTER_SANITIZE_NUMBER_INT );
			$filtered_value = empty( $filtered_value ) ? 5 : $filtered_value;
		}

		if ( 'human_date' === $key ) {
			$filtered_value = filter_var( $value, FILTER_VALIDATE_BOOLEAN );
		}

		if ( 'emails' === $key ) {
			$filtered_value = filter_var_array( $value, FILTER_SANITIZE_STRING );
			$filtered_value = validate_emails_in_array( $filtered_value );
		}

		if ( empty( $filtered_value ) && 'human_date' !== $key ) {
			$is_data_valid = false;
			break;
		}

		$settings[ $key ] = $filtered_value;
	}

	if ( empty( $is_data_valid ) || 'update' !== $type ) {
			return array(
				'status'  => 400,
				'message' => 'Bad Request',
			);
	}

	if ( ! update_option( AWESOMEMOTIVE_SITE_OPTION, $settings ) ) {
		return array(
			'status'  => 400,
			'message' => 'Unable to Update the data.',
		);
	}

	return array(
		'status'  => 200,
		'message' => 'Information updated successfully',
		'data'    => $settings,
	);
}

/**
 * Validate emails in array and remove if validation fails.
 *
 * @param array $emails Emails.
 *
 * @return array
 */
function validate_emails_in_array( array $emails = array() ): array {
	if ( empty( $emails ) ) {
		return array();
	}

	$filtered_emails = array();
	foreach ( $emails as $email ) {
		if ( filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
			$filtered_emails[] = $email;
		}
	}

	return $filtered_emails;
}

/**
 * Get all data endpoint including miusage data and settings data.
 *
 * @return false|mixed|void
 */
function all_data_endpoint_ajax_callback() {
	$options_key        = wp_sprintf( '%smiusage_data', esc_attr( AWESOMEMOTIVE_PREFIX ) );
	$all_data           = get_option( $options_key, array() );
	$all_data->settings = get_option( AWESOMEMOTIVE_SITE_OPTION, array() );

	return $all_data;
}

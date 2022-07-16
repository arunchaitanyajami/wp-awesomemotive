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
 */
function data_endpoint_ajax_callback() {
	$options_key = wp_sprintf( '%smiusage_data', esc_attr( AWESOMEMOTIVE_PREFIX ) );

	return get_option( $options_key, array() );
}

<?php
/**
 * PHPUnit bootstrap file
 *
 * @package awesomemotive-wp-plugin
 */

if ( file_exists( __DIR__ . '/../vendor/autoload.php' ) ) {
	require __DIR__ . '/../vendor/autoload.php';
}

// Looking for .env at the root directory
use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$dotenv->load( __DIR__ . '/../.env' );

/**
 * Manually determine what test suites we're running to prevent running functional test scripts if not required.
 */
$args        = $_SERVER['argv'];
$test_suites = [];
for ( $i = 0; $i < count( $args ); $i ++ ) {
	if ( preg_match( '/--testsuite=(.+)/', $args[ $i ], $matches ) ) {
		$test_suites[] = $matches[1];
	}

	if ( '--testsuite' === $args[ $i ] ) {
		$test_suites[] = $args[ $i + 1 ];
		$i ++;
	}
}

if ( ! empty( $test_suites ) && ! in_array( 'integration', $test_suites, true ) ) {
	return;
}

$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo( 'Installing WP Tests...' . PHP_EOL );
	$cmd = sprintf(
		__DIR__ . '/../bin/install-wp-tests.sh "%s" "%s" "%s" mysql latest true',
		$_ENV['TEST_DB_NAME'],
		$_ENV['DB_USER'],
		$_ENV['DB_PASSWORD']
	);
	echo( $cmd . PHP_EOL );
	shell_exec(
		$cmd
	);
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit( 1 );
}

/**
 * Give access to tests_add_filter() function.
 */
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require __DIR__ . '/../wp-awesomemotive.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

if ( '/usr/src/vendor/wordpress' === $_tests_dir ) {
	define( 'WP_TESTS_CONFIG_FILE_PATH', __DIR__ . '/../tests/wp-tests-config.php' );
}

/**
 * Start up the WP testing environment.
 */
require $_tests_dir . '/includes/bootstrap.php';

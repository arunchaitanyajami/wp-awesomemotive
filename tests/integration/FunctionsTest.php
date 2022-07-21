<?php

namespace AwesomeMotive\Tests\integration;

use WP_UnitTestCase;
use function AwesomeMotive\get_all_settings_ajax_callback;
use function AwesomeMotive\validate_emails_in_array;

class FunctionsTest extends WP_UnitTestCase {
	public function set_up() {
		parent::set_up();
		add_option( AWESOMEMOTIVE_SITE_OPTION, array(
			'num_rows'   => 5,
			'human_date' => true,
			'emails'     => array(
				get_bloginfo( 'admin_email' ),
			),
		) );
	}

	public function tear_down() {
		parent::tear_down();
	}

	/**
	 * Test to determine if settings data is validated and sanitized before its updated.
	 *
	 * @test
	 */
	public function it_should_perform_assertions_against_default_options() {
		$settings = get_option( AWESOMEMOTIVE_SITE_OPTION, array() );
		$this->assertNotEmpty( $settings );
		$this->assertArrayHasKey( 'emails', $settings );
		$this->assertArrayHasKey( 'human_date', $settings );
		$this->assertArrayHasKey( 'num_rows', $settings );
		$this->assertIsArray( $settings['emails'] );
		$this->assertIsBool( $settings['human_date'] );
		$this->assertIsInt( $settings['num_rows'] );
	}

	/**
	 * @test
	 */
	public function it_should_throw_error_status_on_updating_with_empty_data() {
		$settings = get_all_settings_ajax_callback( 'update', array() );
		$this->assertNotEmpty( $settings );
		$this->assertArrayHasKey( 'status', $settings );
		$this->assertArrayHasKey( 'message', $settings );
		$this->assertEquals( 403, $settings['status'] );
		$this->assertEquals( 'Unable to Process request, empty data provided', $settings['message'] );
	}

	/**
	 * @test
	 */
	public function it_should_throw_error_status_on_updating_num_of_rows_with_string_value() {
		$settings = get_all_settings_ajax_callback( 'update', array( 'num_rows' => 'Ten' ) );
		$this->assertNotEmpty( $settings );
		$this->assertArrayHasKey( 'status', $settings );
		$this->assertArrayHasKey( 'message', $settings );
		$this->assertEquals( 400, $settings['status'] );
		$this->assertEquals( 'Bad Request', $settings['message'] );
	}

	/**
	 * @test
	 */
	public function it_should_updating_human_date_with_boolean_value_if_string_passed() {
		$settings = get_all_settings_ajax_callback( 'update', array( 'human_date' => 'Ten' ) );
		$this->assertNotEmpty( $settings );
		$this->assertArrayHasKey( 'status', $settings );
		$this->assertArrayHasKey( 'message', $settings );
		$this->assertEquals( 200, $settings['status'] );
		$this->assertEquals( 'Information updated successfully', $settings['message'] );
		$this->assertIsBool( false, $settings['data']['human_date'] );
	}

	/**
	 * @test
	 */
	public function it_should_throw_error_on_updated_with_string_for_email_key() {
		$settings = get_all_settings_ajax_callback( 'update', array( 'emails' => array() ) );
		$this->assertArrayHasKey( 'status', $settings );
		$this->assertArrayHasKey( 'message', $settings );
		$this->assertEquals( 403, $settings['status'] );
		$this->assertEquals( 'Unable to Process request, empty data provided', $settings['message'] );
	}

	/**
	 * @test
	 */
	public function it_should_filter_emails_on_updated() {
		$settings = get_all_settings_ajax_callback( 'update', array( 'emails' => array('test', 'email@email.com') ) );
		$this->assertArrayHasKey( 'status', $settings );
		$this->assertArrayHasKey( 'message', $settings );
		$this->assertEquals( 200, $settings['status'] );
		$this->assertEquals( 'Information updated successfully', $settings['message'] );
		$this->assertEquals( 1, count( $settings['data']['emails'] ) );
	}

	/**
	 * @test
	 */
	public function it_should_test_validate_emails_in_array() {
		$emails = validate_emails_in_array( array( 'test', 'email@email.com' ) );
		$this->assertCount( 1, $emails );
	}
}

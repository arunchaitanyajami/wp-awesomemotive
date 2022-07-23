<?php

namespace AwesomeMotive\Tests\integration;

use WP_UnitTestCase;

class SiteOptionsTest extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();
		add_option( AWESOMEMOTIVE_SITE_OPTION, array(
			'num_rows'   => 5,
			'human_date' => true,
			'emails'     => array( 'test@test.com' ),
		) );
	}

	public function tear_down() {
		parent::tear_down();
		delete_option( AWESOMEMOTIVE_SITE_OPTION );
	}

	/**
	 * @test
	 * @return void
	 */
	public function it_should_perform_options_assertions() {
		$options = get_option( AWESOMEMOTIVE_SITE_OPTION, [] );
		$this->assertNotEmpty( $options );
		$this->assertIsArray( $options );
		$this->assertArrayHasKey( 'num_rows', $options );
		$this->assertArrayHasKey( 'human_date', $options );
		$this->assertArrayHasKey( 'emails', $options );
		$this->assertEquals( 5, $options['num_rows'] );
		$this->assertIsBool( $options['human_date'] );
		$this->assertTrue( $options['human_date'] );
		$this->assertIsArray( $options['emails'] );
		$this->assertNotEmpty( $options['emails'] );
	}
}

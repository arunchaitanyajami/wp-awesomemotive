<?php

namespace AwesomeMotive\Tests\integration;

use AwesomeMotive\CronJob;
use WP_UnitTestCase;

class CronTest extends WP_UnitTestCase {
	public function set_up() {
		parent::set_up();
	}

	public function tear_down() {
		parent::tear_down();
	}

	/**
	 * @test
	 * @return void
	 */
	public function it_should_initialize_cron_and_perform_assertions() {
		( new CronJob() )->init();

		$hook = wp_sprintf( '%scron_fetch_data', esc_html( AWESOMEMOTIVE_PREFIX ) );

		$this->assertTrue( has_action( $hook ) );
		$this->assertTrue( has_filter( 'cron_schedules' ) );
	}

	/**
	 * @test
	 * @return void
	 */
	public function it_should_test_add_cron_interval_and_perform_assertions() {
		$cron      = new CronJob();
		$schedules = $cron->add_cron_interval( array(
			'test_one_hour' => array(
				'interval' => 60 * 60,
				'display'  => esc_html__( 'Awesome Motive Cron Store: Every One Hour', 'awesomemotive-wp-plugin' ),
			)
		) );

		$this->assertNotEmpty( $schedules );
		$this->assertIsArray( $schedules );
		$this->assertArrayHasKey( 'test_one_hour', $schedules );
		$this->assertIsArray( $schedules['test_one_hour'] );
		$this->assertArrayHasKey( 'interval', $schedules['test_one_hour'] );
		$this->assertEquals( 60 * 60, $schedules['test_one_hour']['interval'] );
	}
}

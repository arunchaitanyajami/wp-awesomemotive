<?php
namespace AwesomeMotive\Tests\integration;

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase {

	/**
	 * @test
	 * @return void
	 */
	public function it_should_perform_sample_assertions() {
		$sample = 1;
		$this->assertEquals( $sample, 1 );
	}
}

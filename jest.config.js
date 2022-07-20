const preset = require( '@wordpress/jest-preset-default/jest-preset' );

module.exports = {
	...preset,
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [ ...preset.setupFilesAfterEnv ],
};

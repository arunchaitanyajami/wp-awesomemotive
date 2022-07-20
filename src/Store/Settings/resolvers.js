import { fetchFromAPI, setOptions } from './actions';

export function* getSettings() {
	const settings = yield fetchFromAPI( 'all_settings_endpoint', 'get' );

	return setOptions( settings );
}

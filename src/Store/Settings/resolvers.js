import { fetchFromAPI, setOptions } from './actions';

/**
 * On store select, fetch from endpoint and update the store and return store.
 *
 * @returns {Generator<{ajaxActionType, type: string, ajaxActionName}, {settings, type: string}, *>}
 */
export function* getSettings() {
	const settings = yield fetchFromAPI( 'all_settings_endpoint', 'get' );

	return setOptions({...settings, ...{isInitialLoad: true}});
}

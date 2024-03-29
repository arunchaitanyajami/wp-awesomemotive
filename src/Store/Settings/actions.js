import { FETCH_FROM_API } from './controls';

/**
 * Update Option from store aswell as store options to db on ajaxcall on dispatch.
 *
 * @param key
 * @param value
 * @returns {Generator<Promise<*>, {type: string, value, key}, *>}
 */
export function* updateOption( key, value ) {
	const settings = yield fetchFromAPI(
		'all_settings_endpoint',
		'update',
		JSON.stringify( {
			[ key ]: value,
		} )
	);

	settings.isDataUpdated = true;

	return {
		type: 'UPDATE_SETTINGS',
		key,
		value,
		settings,
	};
}

/**
 * Delete option from store on dispatch.
 *
 * feature use.
 * @param key
 * @returns {{type: string, key}}
 */
export function deleteOption( key ) {
	return {
		type: 'DELETE_SETTINGS',
		key,
	};
}

/**
 * Set Options on store update.
 *
 * @param settings
 * @returns {{settings, type: string}}
 */
export function setOptions( settings ) {
	return {
		type: 'SET_SETTINGS',
		settings,
	};
}

export function updateDataLoadFlag( isInitialLoad ) {
	return {
		type: 'SET_DATA_LOAD_FLAG',
		isInitialLoad,
	};
}

export function updateDataUpdatedFlag( isDataUpdated ) {
	return {
		type: 'SET_DATA_UPDATE_FLAG',
		isDataUpdated,
	};
}

/**
 * Fetch data from source endpoint and update store.
 *
 * @param ajaxActionName
 * @param ajaxActionType
 * @param data
 * @returns {{ajaxActionType, type: string, ajaxActionName}}
 */
export function* fetchFromAPI( ajaxActionName, ajaxActionType, data = '' ) {
	return {
		type: 'FETCH_FROM_API',
		ajaxActionName,
		ajaxActionType,
		data,
	};
}

/**
 * Update emails to the source object.
 *
 * @param emails
 * @returns {Generator<Promise<*>, {type: string, value, key}, *>}
 */
export function* updateEmails( emails ) {
	let emailsArray = Object.keys( emails ).map( function ( key ) {
		return emails[ key ];
	} );
	yield updateOption( 'emails', emailsArray );
}

/**
 * Update no of rows key in the store.
 *
 * @param rows
 * @returns {Generator<Promise<*>, {type: string, value, key}, *>}
 */
export function* updateRows( rows ) {
	yield updateOption( 'num_rows', parseInt( rows ) );
}

/**
 * Update Human readable key in the store.
 *
 * @param boolValue
 * @returns {Generator<Promise<*>, {type: string, value, key}, *>}
 */
export function* updateDateReadable( boolValue ) {
	yield updateOption( 'human_date', boolValue );
}

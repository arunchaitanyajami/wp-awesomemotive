import { FETCH_FROM_API } from './controls';

export function* updateOption( key, value ) {
	yield FETCH_FROM_API( {
		ajaxActionName: 'all_settings_endpoint',
		ajaxActionType: 'update',
		data: JSON.stringify( {
			[ key ]: value,
		} ),
	} );

	return {
		type: 'UPDATE_SETTINGS',
		key,
		value,
	};
}

export function deleteOption( key ) {
	return {
		type: 'DELETE_SETTINGS',
		key,
	};
}

export function setOptions( settings ) {
	return {
		type: 'SET_SETTINGS',
		settings,
	};
}

export function fetchFromAPI( ajaxActionName, ajaxActionType ) {
	return {
		type: 'FETCH_FROM_API',
		ajaxActionName,
		ajaxActionType,
	};
}

export function* updateEmails( emails ) {
	let emailsArray = Object.keys( emails ).map( function ( key ) {
		return emails[ key ];
	} );
	yield updateOption( 'emails', emailsArray );
}

export function* updateRows( rows ) {
	yield updateOption( 'num_rows', parseInt( rows ) );
}

export function* updateDateReadable( boolValue ) {
	yield updateOption( 'human_date', boolValue );
}

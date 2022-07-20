import deafultOptions from '../../deafultOptions';

/**
 * Fetch data from source endpoint and update store.
 *
 * @param ajaxActionName
 * @param ajaxActionType
 * @param data
 * @returns {Promise<any>}
 * @constructor
 */
export function FETCH_FROM_API( { ajaxActionName, ajaxActionType, data } ) {
	const formData = new FormData();

	formData.append( 'action', ajaxActionName );
	formData.append( 'type', ajaxActionType );
	formData.append( 'wpam_nonce', deafultOptions.wp_nonce );
	if ( data ) {
		formData.append( 'data', data );
	}

	const params = new URLSearchParams( formData );

	return fetch( deafultOptions.ajaxUrl, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Cache-Control': 'no-cache',
		},
		body: params,
	} )
		.then( ( response ) => {
			return response.json();
		} )
		.then( ( response ) => {
			return response;
		} );
}

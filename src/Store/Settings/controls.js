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
export async function FETCH_FROM_API( { ajaxActionName, ajaxActionType, data } ) {
	const formData = new FormData();

	/**
	 * WP AJAX Action.
	 */
	formData.append('action', ajaxActionName)

	/**
	 * Get || Update.
	 */
	if (ajaxActionType) {
		formData.append('type', ajaxActionType)
	}

	/**
	 * Wp nonce value
	 */
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

import { createReduxStore, register } from '@wordpress/data';
import WpamEditorSettings from '../deafultOptions';
import { FETCH_FROM_API } from './Settings/controls';

const DEFAULT_STATE = {
	graph: {},
	table: {
		title: '',
		data: {
			headers: {},
			rows: {},
		},
	},
	isLoading:false,
	settings: {
		...WpamEditorSettings.settings,
	},
	...WpamEditorSettings.data,
};

const actions = {
	setData( data ) {
		return {
			type: 'SET_DATA',
			data,
		};
	},

	*reloadData() {
		const data = yield actions.fetchFromAPI( 'fetch_data_endpoint' );

		return {
			type: 'SET_DATA',
			data,
		};
	},
	*fetchFromAPI( ajaxAction ) {
		return {
			type: 'FETCH_FROM_API',
			ajaxAction,
		};
	},
};

const data = createReduxStore( 'awesomemotive/data', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_DATA':
				return {
					...state,
					...action.data,
				};
		}

		return state;
	},

	actions,

	selectors: {
		getData( state ) {
			return state;
		},
	},

	controls: {
		FETCH_FROM_API( action ) {
			return FETCH_FROM_API( {
				ajaxActionName: action.ajaxAction,
				ajaxActionType: 'get',
			} );
		},
	},

	resolvers: {
		*getData() {
			const data = yield actions.fetchFromAPI( 'all_data_endpoint' );
			return actions.setData( { ...data } );
		},
	},
} );

register( data );

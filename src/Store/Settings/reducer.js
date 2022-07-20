import * as constant from './constants';

const { DEFAULT_STATE } = constant;

export default ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_SETTINGS':
			return {
				...state,
				...action.settings,
			};
		case 'UPDATE_SETTINGS':
			return {
				...state,
				...{
					[ action.key ]: action.value,
				},
			};
	}

	return state;
};

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
				data: {
					...state.data,
					...{
						[ action.key ]: action.value,
					},
				},
				...action.settings,
			};
		case 'SET_DATA_LOAD_FLAG':
			return {
				...state,
				...{
					isInitialLoad: action.isInitialLoad,
				},
			};
		case 'SET_DATA_UPDATE_FLAG':
			return {
				...state,
				...{
					isDataUpdated: action.isDataUpdated,
				},
			};
	}

	return state;
};

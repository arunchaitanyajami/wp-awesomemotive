import { createReduxStore, register } from '@wordpress/data';

import * as constant from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import * as resolvers from './resolvers';
import * as controls from './controls';

const settings = createReduxStore( constant.STORE_NAME, {
	reducer,
	actions,
	selectors,
	controls,
	resolvers,
} );

register( settings );

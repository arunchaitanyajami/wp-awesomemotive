import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

import Settings from '../Component/Settings';
import { STORE_NAME } from '../Store/Settings/constants';

export const mapSelectToProps = ( select ) => {
	const { getSettings } = select( STORE_NAME );

	return {
		settings: getSettings(),
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	const { updateEmails, updateRows, updateDateReadable, updateDataLoadFlag, updateDataUpdatedFlag } =
		dispatch( STORE_NAME );

	return {
		updateEmails,
		updateRows,
		updateDateReadable,
		updateDataLoadFlag,
		updateDataUpdatedFlag
	};
};

export default compose( [
	withSelect( mapSelectToProps ),
	withDispatch( mapDispatchToProps ),
] )( Settings );

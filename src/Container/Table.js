import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import Table from '../Component/Table';
import { STORE_NAME } from '../Store/Settings/constants';

const DATA_STORE_NAME = 'awesomemotive/data';
export const mapSelectToProps = ( select ) => {
	const { getData } = select( DATA_STORE_NAME );
	const { getSettings } = select( STORE_NAME );
	return {
		tableData: getData(),
		settings: getSettings(),
	};
};

export default compose( [ withSelect( mapSelectToProps ) ] )( Table );

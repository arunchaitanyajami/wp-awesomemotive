import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import Graph from '../Component/Graph';

const DATA_STORE_NAME = 'awesomemotive/data';
export const mapSelectToProps = ( select ) => {
	const { getData } = select( DATA_STORE_NAME );
	return {
		tableData: getData(),
		isLoading: false
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	const { reloadData } = dispatch( DATA_STORE_NAME );

	return {
		reloadData
	};
};

export default compose( [
	withSelect( mapSelectToProps ),
	withDispatch( mapDispatchToProps ),
] )( Graph );

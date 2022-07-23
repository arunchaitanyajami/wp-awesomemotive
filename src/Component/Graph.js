import { __ } from '@wordpress/i18n';
import * as defaultOptions from '../deafultOptions';
import { Icon, rotateRight } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element'
import { Spinner } from '@wordpress/components';

export default ( { tableData, reloadData } ) => {
	const maxPageViews = 50000;
	const { graph, table } = tableData;
	const [ isLoading, setIsLoading ] = useState(false);

	const covertData = ( timeStamp ) => {
		return new Date( timeStamp * 1000 ).toDateString();
	};

	/**
	 * Fetch data from source.
	 */
	const loadData = () => {
		setIsLoading(true)
		reloadData()
	}

	useEffect(() => {
		setIsLoading(tableData.isLoading)
	}, [tableData])
	

	return (
		<div className={ 'awesomemotive-container' }>
			<div className={ 'awesomemotive-graph-reload' }>
				<div onClick={ loadData }>
					<Icon icon={ rotateRight } />
				</div>
			</div>
			<div className={ 'awesomemotive-graph-container' }>
				{ isLoading && <Spinner /> }
				{ !isLoading && table && Object.keys( graph ).length > 0 && (
					<table className="graph">
						{ table.title && (
							<caption>
								{ __(
									table.title,
									defaultOptions.text_domain
								) }
							</caption>
						) }
						<thead>
							<tr>
								<th scope="col">Page Views</th>
							</tr>
						</thead>
						<tbody>
							{ Object.keys( graph ).map( ( value, index ) => {
								let percentage =
									( graph[ value ].value / maxPageViews ) *
									100;
								percentage = Math.round( percentage );

								return (
									<tr
										key={ value }
										style={ { height: percentage + '%' } }
									>
										<th scope="row">
											{ covertData(
												graph[ value ].date
											) }
										</th>
										<td>
											<span>
												{ graph[ value ].value }
											</span>
										</td>
									</tr>
								);
							} ) }
						</tbody>
					</table>
				) }
				{ !isLoading && ( <div style={ { textAlign: 'center' } }>Time Stamp</div> ) }
			</div>
		</div>
	);
};

import { __ } from '@wordpress/i18n';
import * as defaultOptions from '../deafultOptions';
import { Icon, rotateRight } from '@wordpress/icons';

export default ( { tableData, reloadData } ) => {
	const maxPageViews = 50000;
	const { graph, table } = tableData;

	const covertData = ( timeStamp ) => {
		return new Date( timeStamp * 1000 ).toDateString();
	};

	return (
		<div className={ 'awesomemotive-container' }>
			<div className={ 'awesomemotive-graph-reload' }>
				<div onClick={ reloadData }>
					<Icon icon={ rotateRight } />
				</div>
			</div>
			<div className={ 'awesomemotive-graph-container' }>
				{ table && Object.keys( graph ).length > 0 && (
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
				<div style={ { textAlign: 'center' } }>Time Stamp</div>
			</div>
		</div>
	);
};

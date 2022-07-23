import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from '@wordpress/element';
import * as qs from 'query-string';
import Settings from './Container/Settings';
import Graph from './Container/Graph';
import Table from './Container/Table';
import { __ } from '@wordpress/i18n';
import * as defaultOptions from './deafultOptions';

export default () => {
	const { getTabIndex } = qs.parse( location.search );
	const [ tabIndex, setTabIndex ] = useState(
		getTabIndex ? parseInt( getTabIndex ) : 0
	);

	/**
	 * Set tab index, this will help preserve the current tab state when page is reloaded.
	 * @param index
	 */
	const changeTabIndex = ( index ) => {
		setTabIndex( index );

		let newUrl =
			window.location.protocol +
			'//' +
			window.location.host +
			window.location.pathname +
			'?page=awesome-motive&getTabIndex=' +
			index;
		window.history.pushState( { path: newUrl }, '', newUrl );
	};

	return (
		<div className={ 'awesomemotive-container' }>
			<Tabs
				defaultIndex={ tabIndex }
				onSelect={ ( index ) => changeTabIndex( index ) }
			>
				<TabList>
					<Tab>{ __( 'Settings', defaultOptions.text_domain ) }</Tab>
					<Tab>{ __( 'Table', defaultOptions.text_domain ) }</Tab>
					<Tab>{ __( 'Graph', defaultOptions.text_domain ) }</Tab>
				</TabList>
				<TabPanel>
					<Settings />
				</TabPanel>
				<TabPanel>
					<Table />
				</TabPanel>
				<TabPanel>
					<Graph />
				</TabPanel>
			</Tabs>
		</div>
	);
};

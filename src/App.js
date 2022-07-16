import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from '@wordpress/element';
import * as qs from 'query-string';
import Settings from './Component/Settings'
import Graph from './Component/Graph'
import Table from './Component/Table'

export default () => {
	const { getTabIndex } = qs.parse( location.search );
	const [ tabIndex, setTabIndex ] = useState( getTabIndex ? getTabIndex : 0 );

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
	
	const fetchMiUsageData = () => {
		
	}

	return (
		<Tabs
			defaultIndex={ tabIndex }
			onSelect={ ( index ) => changeTabIndex( index ) }
		>
			<TabList>
				<Tab>Settings</Tab>
				<Tab>Table</Tab>
				<Tab>Graph</Tab>
			</TabList>
			<TabPanel><Settings /></TabPanel>
			<TabPanel><Table /></TabPanel>
			<TabPanel><Graph /></TabPanel>
		</Tabs>
	);
};

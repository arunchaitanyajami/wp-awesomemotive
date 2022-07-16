import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from '@wordpress/element';
import * as qs from 'query-string';

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
			<TabPanel>Content 1</TabPanel>
			<TabPanel>Content 2</TabPanel>
			<TabPanel>Content 3</TabPanel>
		</Tabs>
	);
};

/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock( '../Container/Settings', () =>
	jest.fn( () => {
		return 'Settings';
	} )
);

jest.mock( '../Container/Table', () =>
	jest.fn( () => {
		return 'Table';
	} )
);

jest.mock( '@wordpress/data', () => ( {
	registerStore: jest.fn(),
	combineReducers: jest.fn(),
	createReduxStore: jest.fn(),
	register: jest.fn(),
	useSelect: jest.fn(),
	useDispatch: jest.fn( () => ( {
		updateEmails: jest.fn(),
		updateRows: jest.fn(),
		updateDateReadable: jest.fn(),
	} ) ),
	withSelect: jest.fn(),
	withDispatch: jest.fn(),
} ) );
jest.mock( '@wordpress/components' );
jest.mock( '@wordpress/compose', () => ( {
	compose: jest.fn(),
	createHigherOrderComponent: jest.fn(),
} ) );

describe( 'App', () => {
	test( 'Is Expected to have Settings, Graph and Table Tab', async () => {
		let { container } = render( <App /> );
		expect( container.querySelector( '#react-tabs-0' ) ).toHaveTextContent(
			'Settings'
		);
		expect( container.querySelector( '#react-tabs-2' ) ).toHaveTextContent(
			'Table'
		);
		expect( container.querySelector( '#react-tabs-4' ) ).toHaveTextContent(
			'Graph'
		);
		expect( container ).toMatchSnapshot();
	} );
} );

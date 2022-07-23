import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../Table';

const props = {
	tableData: {
		table: {
			title: '',
			data: {
				headers: {},
				rows: {},
			},
		},
	},
	settings: {
		data: {
			human_date: true,
			num_rows: 5,
			emails: {},
		},
	},
};

describe( 'Table Component', () => {
	it( 'Should Render the default component with empty props', async () => {
		const { container } = render( <Table { ...props } /> );
		expect( screen.queryByText( 'table' ) ).not.toBeInTheDocument();
		expect( container ).toMatchSnapshot();
	} );
	it( 'Should Render the component with ordered list of emails', async () => {
		props.settings.data.emails = [ 'test@test.com', 'emial@email.com' ];
		const { container } = render( <Table { ...props } /> );
		expect( container.querySelector( 'ul' ) ).toBeVisible();
		expect( container.querySelector( 'ul > li' ).innerHTML ).toEqual(
			props.settings.data.emails[ 0 ]
		);
		expect( container.querySelectorAll( 'ul li' ).length ).toEqual(
			props.settings.data.emails.length
		);

		expect( container ).toMatchSnapshot();
	} );

	it( 'Should Render the component with table containing data', async () => {
		props.tableData.table.title = 'Testing Table';
		props.tableData.table.data = {
			headers: [ 'ID', 'URL', 'Title', 'Page Views', 'Date' ],
			rows: [
				{
					id: 1,
					url: 'https://google.com',
					title: 'Google co in',
					pageviews: 122,
					date: 1657826894,
				},
				{
					id: 2,
					url: 'https://google2.com',
					title: 'Google 2 co in',
					pageviews: 130,
					date: 1657826894,
				},
			],
		};

		const { container } = render( <Table { ...props } /> );

		expect( container.querySelector( 'table' ) ).toBeVisible();
		expect( container.querySelector( 'table > thead' ) ).toBeVisible();
		expect( container.querySelector( 'table > thead > tr' ) ).toBeVisible();
		expect( container.querySelector( 'table > caption' ) ).toBeVisible();
		expect( container.querySelector( 'table > tbody' ) ).toBeVisible();

		expect(
			container.querySelector( 'table > caption' ).innerHTML
		).toEqual( props.tableData.table.title );
		expect(
			container.querySelector( 'table > thead > tr > td' ).innerHTML
		).toEqual( 'ID' );
		expect(
			container.querySelectorAll( 'table >  thead > tr td' ).length
		).toEqual( props.tableData.table.data.headers.length );

		expect(
			parseInt(
				container.querySelector( 'table > tbody > tr > td' ).innerHTML
			)
		).toEqual( 1 );
		expect(
			container.querySelectorAll( 'table >  tbody > tr' ).length
		).toEqual( 2 );
	} );
} );

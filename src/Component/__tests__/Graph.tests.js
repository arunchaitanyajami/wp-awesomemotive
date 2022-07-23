import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Graph from '../Graph';

const props = {
	tableData: {
		graph: {},
		table: {},
	},
	reloadData: jest.fn(),
};

describe( 'Graph Component', () => {
	it( 'Should Render the default component with empty props', async () => {
		const { container } = render( <Graph { ...props } /> );
		expect( screen.queryByText( 'table' ) ).not.toBeInTheDocument();
		expect( container ).toMatchSnapshot();
	} );

	it( 'Should Render the component with table containing data', async () => {
		props.tableData.graph = {
			0: { date: 1657929219, value: 31776 },
			1: { date: 1658015619, value: 38863 },
			2: { date: 1658102019, value: 13690 },
			3: { date: 1658188419, value: 33777 },
			4: { date: 1658274819, value: 18959 },
			5: { date: 1658361219, value: 34964 },
			8: { date: 1658447619, value: 8006 },
		};

		props.tableData.table.title = 'Test Title';

		const { container } = render( <Graph { ...props } /> );

		expect( container.querySelector( 'table' ) ).toBeVisible();
		expect( container.querySelector( 'table > thead' ) ).toBeVisible();
		expect( container.querySelector( 'table > thead > tr' ) ).toBeVisible();
		expect( container.querySelector( 'table > caption' ) ).toBeVisible();
		expect( container.querySelector( 'table > tbody' ) ).toBeVisible();

		expect(
			container.querySelector( 'table > caption' ).innerHTML
		).toEqual( props.tableData.table.title );
		expect(
			container.querySelectorAll( 'table >  tbody > tr' ).length
		).toEqual( 7 );
	} );
} );

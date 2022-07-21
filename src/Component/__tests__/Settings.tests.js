import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../Settings';

let props = {
	setValue: jest.fn(),
	setDate: jest.fn(),
	setEmails: jest.fn(),
	data: {
		emails: [ 'test@test.com' ],
		num_rows: 5,
		human_date: false,
	}
};

jest.mock( '@wordpress/data', () => ( {
	useSelect: jest.fn( () => ( {
		getSettings: jest.fn().mockReturnValue( {
			data: jest.fn().mockReturnValue( {
				emails: [ 'test@test.com' ],
				num_rows: 5,
				human_date: false,
			} ),
		} ),
	} ) ),
	withSelect: jest.fn(),
	combineReducers: jest.fn(),
	createReduxStore: jest.fn(),
	register: jest.fn(),
} ) );

describe( 'Settings Component', () => {
	let useEffect;
	let useState;
	beforeEach( () => {
		useEffect = jest.spyOn( React, 'useEffect' );
		useState = jest.spyOn( React, 'useState' );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	const mockUseEffect = () => {
		useEffect.mockImplementationOnce( ( f ) => f() );
	};

	it( 'Should Render the default component', async () => {
		mockUseEffect();
		mockUseEffect();
		useState
			.mockReturnValueOnce( [ props.data.num_rows, jest.fn() ] )
			.mockReturnValueOnce( [ props.data.human_date, jest.fn() ] )
			.mockReturnValueOnce( [ props.data.emails, jest.fn() ] );
		const { container } = render( <Settings settings={props} /> );

		expect(
			parseInt(
				container.querySelector(
					'#awesomemotive-settings-form-input-no-of-rows'
				).value
			)
		).toBe( 5 );
		expect( container.querySelector( '#email_1' ).value ).toBe(
			props.data.emails[ 0 ]
		);
		expect(
			container.querySelector( '.components-form-toggle__input' )
		).toBeVisible();
		expect( container ).toMatchSnapshot();
	} );

	it( 'Should add multiple emails and check if node exists', async () => {
		props.data.emails = props.data.emails.concat( [
			'test2@test.com',
			'test3@test.com',
			'test4@test.com',
		] );

		mockUseEffect();
		mockUseEffect();
		useState
			.mockReturnValueOnce( [ props.data.num_rows, jest.fn() ] )
			.mockReturnValueOnce( [ props.data.human_date, jest.fn() ] )
			.mockReturnValueOnce( [ props.data.emails, jest.fn() ] );
		const { container } = render( <Settings settings={props} /> );

		expect( container.querySelector( '#email_1' ).value ).toBe(
			props.data.emails[ 0 ]
		);
		expect( container.querySelector( '#email_3' ).value ).toBe(
			props.data.emails[ 2 ]
		);

		expect( container ).toMatchSnapshot();
	} );
} );

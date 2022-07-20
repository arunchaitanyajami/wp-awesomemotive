import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailInputComponent from '../EmailInputComponent';

let props = {
	value: 'test@test.com',
	keyId: 1,
	keyIndex: 1,
	saveEmail: jest.fn(),
	removeEmail: jest.fn(),
};

describe( 'Email Input Component', () => {
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

	it( 'Should Render the component', async () => {
		useState
			.mockReturnValueOnce( [ props.value, jest.fn() ] )
			.mockReturnValueOnce( [ false, jest.fn() ] )
			.mockReturnValueOnce( [ props.keyId, jest.fn() ] );

		const { container } = render( <EmailInputComponent { ...props } /> );

		expect( container.querySelector( '#email_1' ).value ).toBe(
			props.value
		);

		expect( container ).toMatchSnapshot();
	} );

	it( 'Should Render the component with error', async () => {
		useState
			.mockReturnValueOnce( [ props.value, jest.fn() ] )
			.mockReturnValueOnce( [ true, jest.fn() ] )
			.mockReturnValueOnce( [ props.keyId, jest.fn() ] );

		const { container } = render( <EmailInputComponent { ...props } /> );

		expect(
			container.querySelector(
				'.awesomemotive-settings-form-input-error'
			)
		).toBeInTheDocument();
		expect(
			screen.getByText( 'Invalid email address' )
		).toBeInTheDocument();
		expect( container ).toMatchSnapshot();
	} );
} );

import { useState, useEffect } from '@wordpress/element';
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import * as defaultOptions from '../deafultOptions';
import { Icon, plus, trash } from '@wordpress/icons';

/**
 * Email input component.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default ( { value, keyId, saveEmail, removeEmail } ) => {
	const [ email, setEmail ] = useState( value );
	const [ invalidEmail, setInvalidEmail ] = useState( false );

	const preCheckEmail = ( value ) => {
		let isEmail = value.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		setEmail( value );
		setInvalidEmail( ! isEmail );
		if ( isEmail ) {
			saveEmail( keyId - 1, value );
		}
	};

	const deleteEmail = () => {
		removeEmail( keyId - 1 );
	};

	return (
		<div
			className={ 'awesomemotive-settings-form-input-repeater' }
			id={ 'awesomemotive-settings-form-input-repeater' + keyId }
		>
			{ invalidEmail && email && (
				<div className={ 'awesomemotive-settings-form-input-error' }>
					{ __(
						'Invalid email address',
						defaultOptions.text_domain
					) }{ ' ' }
				</div>
			) }
			<div className={ 'awesomemotive-settings-form-input-control' }>
				<InputControl
					label={ __(
						sprintf( 'Email %d', keyId ),
						defaultOptions.text_domain
					) }
					value={ email }
					type={ 'email' }
					name={ 'email' }
					id={ sprintf( 'email_%d', keyId ) }
					required
					placeholder={ 'Enter email address..' }
					onChange={ ( nextValue ) =>
						preCheckEmail( nextValue ?? '' )
					}
				/>
			</div>
			<div className={ 'awesomemotive-settings-form-input-trash-icon' }>
				<Icon icon={ trash } onClick={ () => deleteEmail() } />
			</div>
		</div>
	);
};

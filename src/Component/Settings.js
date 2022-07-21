import {
	__experimentalInputControl as InputControl,
	ToggleControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import * as defaultOptions from '../deafultOptions';
import { Icon, plus, close } from '@wordpress/icons';
import EmailInputComponent from './EmailInputComponent';

export default ( {
	settings,
	updateEmails,
	updateRows,
	updateDateReadable,
	updateDataLoadFlag,
	updateDataUpdatedFlag
} ) => {
	const { data } = settings;
	const [ value, setValue ] = useState( data.num_rows );
	const [ date, setDate ] = useState( data.human_date );
	const [ emails, setEmails ] = useState( {} );
	const [ reloadComponent, setReloadComponent ] = useState( true );
	const [ isError, setIsError ] = useState( false );
	const [ message, setMessage ] = useState( '' );

	/**
	 * Set no of rows to display.
	 *
	 * @param value
	 */
	const setRows = ( value ) => {
		setValue( value );
		updateRows( value );
		setReloadComponent(false)
	};

	/**
	 * Updated human readable flag.
	 *
	 * @param booleanValue
	 */
	const setDateReadable = ( booleanValue ) => {
		setDate( booleanValue );
		updateDateReadable( booleanValue );
		setReloadComponent(false)
	};

	/**
	 * Set email count.
	 */
	const setNewInput = () => {
		let index = Object.keys( emails ).length;
		setEmails( {
			...emails,
			...{
				[ index ]: '',
			},
		} );
	};

	/**
	 * Fetch values form email child components and append/replace data.
	 * @param key
	 * @param value
	 */
	const sendEmail = ( key, value ) => {
		let appendEmail = {
			[ key ]: value,
		};

		setEmails( {
			...emails,
			...appendEmail,
		} );

		updateEmails( {
			...emails,
			...appendEmail,
		} );

		setReloadComponent(false)
	};

	/**
	 * Remove email from emails object.
	 *
	 * @param key
	 */
	const removeEmail = ( key ) => {
		delete emails[ key ];
		setEmails( { ...emails } );
		updateEmails( { ...emails } );
		setReloadComponent(false)
	};

	const updatedFlags = () => {
		setIsError(false);
		setMessage('')
		updateDataLoadFlag(false);
		updateDataUpdatedFlag(false);
	}

	/**
	 * Updated flags on closing notice.
	 */
	const onCloseNotice = () => {
		setIsError(false);
		setMessage('')
		updateDataLoadFlag(false);
		updateDataUpdatedFlag(false);
	}

	useEffect(() => {
		if (reloadComponent) {
			setEmails(data.emails);
			setValue(data.num_rows);
			setDate(data.human_date ?? false);
		}

		if ((settings.isDataUpdated || settings.isInitialLoad) && 200 !== settings.status) {
			setIsError(true);
			setMessage(settings.message);
		}

		if ((settings.isDataUpdated || settings.isInitialLoad) && 200 === settings.status) {
			setIsError(false);
			setMessage(settings.message);
		}
	}, [data]);

	/**
	 * Provide error notice.
	 *
	 * @returns {JSX.Element}
	 * @constructor
	 */
	const ErrorNotice = ({type}) => (
		<div className={'components-notice is-' + type}>
			<div className={'components-notice-message'}>
				{'error' === type && <p> An error occurred: <code>{message}</code>.</p>}
				{'success' === type && <p>{message}</p>}
			</div>
			<div className={'components-notice-button'} onClick={ () => { onCloseNotice() }} >
				<p><Icon icon={close}/></p>
			</div>
		</div>
	);

	return (
		<div className={'awesomemotive-settings-container-fluid'}>
			{ isError && message && <ErrorNotice type={'error'} /> }
			{ !isError && message && <ErrorNotice type={'success'} /> }
			<div className={ 'awesomemotive-settings-container' }>
				<div className={ 'awesomemotive-settings-form-inputs' }>
					<InputControl
						label={ __( 'No of rows', defaultOptions.text_domain ) }
						value={ value }
						type={ 'number' }
						id={ 'awesomemotive-settings-form-input-no-of-rows' }
						onChange={ ( nextValue ) => setRows( nextValue ?? '' ) }
					/>
				</div>
				<div className={ 'awesomemotive-settings-form-inputs' }>
					<ToggleControl
						label={ __(
							'Human Readable Date',
							defaultOptions.text_domain
						) }
						help={
							date
								? __(
										'Readable date enabled.',
										defaultOptions.text_domain
								  )
								: __(
										'Timestamp displayed',
										defaultOptions.text_domain
								  )
						}
						checked={ date }
						id={ 'awesomemotive-settings-form-input-date' }
						onChange={ ( value ) => {
							setDateReadable( value );
						} }
					/>
				</div>
				<div className={ 'awesomemotive-settings-form-inputs' }>
					<h2>{ __( 'Email List:', defaultOptions.text_domain ) }</h2>
					<div className={ 'awesomemotive-settings-form-input-inner' }>
						{ Object.keys( emails ).map( ( value, c ) => {
							return (
								<EmailInputComponent
									key={ value }
									keyId={ parseInt( value ) + 1 }
									keyIndex={ value }
									value={ emails[ value ] ?? '' }
									saveEmail={ sendEmail }
									removeEmail={ removeEmail }
								/>
							);
						} ) }
						<div
							className={ 'awesomemotive-settings-add-inputs' }
							data-testid={ 'awesomemotive-settings-add-inputs' }
							onClick={ setNewInput }
						>
							<Icon icon={ plus } />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

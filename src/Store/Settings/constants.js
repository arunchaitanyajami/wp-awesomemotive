import WpamEditorSettings from '../../deafultOptions';
export const STORE_NAME = 'awesomemotive/settings';
export const DEFAULT_STATE = {
	data: {
		num_rows: 5,
		human_date: false,
		emails: {},
		...WpamEditorSettings.settings,
	},
	status: 200,
	message: 'Data Obtained successfully',
	isInitialLoad: false,
	isDataUpdated: false,
};

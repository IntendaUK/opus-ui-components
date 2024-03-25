const props = {
	active: {
		type: 'boolean',
		desc: 'Indicates that a tab is currently active and its contents can be viewed'
	},
	activeTab: {
		type: 'string',
		desc: 'The ID of the active tab',
		internal: true
	},
	hideSingle: {
		type: 'boolean',
		desc: 'When true, the tab container will hide tab buttons when there is only one tab'
	},
	handlerOnCloseTab: {
		type: 'function',
		desc: 'The handler function to be executed when the tab is closed'
	},
	hasCloseOption: {
		type: 'boolean',
		desc: 'When true, the user can close the tab'
	},
	prpsTabButton: {
		type: 'object',
		desc: 'Override properties for the buttons that are rendered for both inactive and active tabs'
	},
	prpsTabButtonActive: {
		type: 'object',
		desc: 'Override properties for the buttons that are rendered for the active tab'
	}
};

export default props;

const props = {
	enabled: {
		type: 'boolean',
		desc: 'When true, the tab is enabled.',
		dft: true
	},
	active: {
		type: 'boolean',
		desc: 'Indicates that a tab is currently active and its contents can be viewed',
		dft: false
	}
};

export default props;

const props = {
	options: {
		type: 'array',
		desc: 'The list of values from which can be chosen'
	},
	value: {
		type: 'string',
		desc: 'The value of the checkbox',
		dft: 0
	},
	inline: {
		type: 'boolean',
		desc: 'When true, the options will render inline',
		dft: false,
		classMap: 'inline'
	},
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the radio will have a label'
	},
	prpsIcon: {
		type: 'object',
		desc: 'Properties which are passed to the radio\'s icon'
	},
	prpsLabel: {
		type: 'object',
		desc: 'Properties which are passed to the radio\'s label'
	},
	prpsOptionLabel: {
		type: 'object',
		desc: 'Properties which are passed to each radio label'
	}
};

export default props;

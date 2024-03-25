const props = {
	valueString: {
		type: 'string',
		desc: 'The stringified JSON object used for internal purposes',
		dft: '{}',
		internal: true
	},
	value: {
		type: 'object',
		desc: 'The JSON object to be rendered inside the code component'
	}
};

export default props;

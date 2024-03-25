/* eslint-disable max-len */
const props = {
	inputType: {
		type: 'string',
		desc: 'Tells the component which input type component it should render',
		options: ['regular', 'multiline', 'masked', 'formatted'],
		dft: ({ multiline, mask, prefix, suffix, thousandSeparator, decimalSeparator }) => {
			if (multiline)
				return 'multiline';
			else if (mask)
				return 'masked';
			else if (prefix || suffix || thousandSeparator || decimalSeparator)
				return 'formatted';

			return 'regular';
		},
		internal: true
	},
	step: {
		type: 'number',
		desc: 'Defines the increment/decrement to be performed when using the scroll wheel over the input',
		dft: ({	decimalScale, dataType }) => {
			if (decimalScale)
				return 1 / Math.pow(10, decimalScale);
			else if (dataType === 'decimal')
				return 0.01;
			else if (dataType === 'integer')
				return 1;
		}
	},
	hasError: {
		type: 'boolean',
		desc: 'Defines whether an error is present. This field is here to make it easier to use error states in flows and scripts.',
		internal: true
	},
	error: {
		type: 'array',
		desc: 'Contains a list of errors for the component when validation fails',
		classMap: true,
		internal: true
	},
	file: {
		type: 'object',
		desc: 'The value of the selected file',
		internal: true
	},
	files: {
		type: 'array',
		desc: 'An array of one or more files that have been selected',
		internal: true
	},
	boxRef: {
		type: 'refObject',
		desc: 'A reference to the input box',
		internal: true
	},
	loadLookupValue: {
		type: 'boolean',
		desc: 'When true, the input component will automatically attempt to load its lookup values',
		internal: true
	},
	lookupResults: {
		type: 'array',
		desc: 'A list containing the results of an auto lookup that is performed when loadLookupValue is set to true',
		internal: true
	}
};

export default props;

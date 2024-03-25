/*eslint-disable max-len*/
const props = {
	min: {
		type: 'decimal',
		desc: 'A decimal defining the minimum value that can be plotted'
	},
	max: {
		type: 'decimal',
		desc: 'A decimal defining the maximum value that can be plotted'
	},
	value: {
		type: 'decimal',
		desc: 'A value to be displayed that, when passed, will set the spinner as determinate, and progress will be indicated'
	},
	loading: {
		type: 'boolean',
		desc: 'When true, the loading spinner will show'
	}
};

export default props;

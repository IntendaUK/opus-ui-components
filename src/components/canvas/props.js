/* eslint-disable max-len */

const props = {
	tClear: {
		type: 'boolean',
		desc: 'When set to true, the canvas will be cleared'
	},
	tLoadValue: {
		type: 'base4 string',
		desc: 'Defines a base64 string to be loaded and drawn on the canvas'
	},
	tClearAndLoadValue: {
		type: 'base64 string',
		desc: 'Functions the same as tLoadValue but will clear the canvas before loading the image'
	},
	penColor: {
		type: 'string',
		desc: 'Defines the color of the pen stroke',
		spec: '{theme.name.key}',
		dft: '{theme.colors.primary}'
	},
	penMinWidth: {
		type: 'number',
		desc: 'Defines the minimum width of the pen stroke. The faster the pen moves, the narrower the stroke will become (but no less than this limit)',
		dft: 1
	},
	penMaxWidth: {
		type: 'number',
		desc: 'Defines the maximum width of the pen stroke. The slower the pen moves, the thicker the stroke will become (but no more than this limit)',
		dft: 2
	},

	ref: {
		type: 'refObject',
		desc: 'A reference to the canvas DOM node',
		internal: true
	},

	value: {
		type: 'string',
		desc: 'The base64 representation of the drawn image'
	}
};

export default props;


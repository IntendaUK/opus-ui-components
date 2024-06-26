const props = {
	files: {
		type: 'array',
		desc: 'A list of files',
		dft: () => []
	},
	fileList: {
		type: 'array',
		desc: 'An array containing the file names',
		dft: () => []
	},
	dragging: {
		type: 'boolean',
		desc: 'When true, the user is dragging',
		classMap: 'dragging',
		dft: false
	},
	tOpenFileSelector: {
		type: 'boolean',
		desc: 'Used to open a file explorer input window',
		dft: false
	},
	canSelectMultiple: {
		type: 'boolean',
		desc: 'Used to specify whether this component should be able to handle multiple files at once.',
		dft: false
	}
};

export default props;

const props = {
	imageHeight: {
		type: 'string',
		desc: 'A percentage string that defines the image\'s height',
		dft: '100%'
	},
	imageWidth: {
		type: 'string',
		desc: 'A percentage string that defines the image\'s width',
		dft: '100%'
	},
	value: {
		type: 'string',
		desc: 'A string path defining the location of the image'
	},
	alt: {
		type: 'string',
		desc: 'A text entry that is shown when the image cannot be displayed',
		dft: ''
	},
	tooltip: {
		type: 'string',
		desc: 'A string that defines the images\'s tooltip text',
		dft: ''
	},
	colorAltText: {
		type: 'string',
		desc: 'The color to display the alt text in',
		cssVar: 'color-alt-text',
		cssVarVal: true
	}
};

export default props;


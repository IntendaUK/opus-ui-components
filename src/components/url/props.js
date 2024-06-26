const props = {
	value: {
		type: 'string',
		desc: 'A string defining the url'
	},
	enableScroll: {
		type: 'string',
		desc: 'A string defining how scrolling should take place',
		dft: 'auto'
	},
	title: {
		type: 'string',
		desc: 'A string defining the title of the iframe',
		dft: 'iframe'
	}
};

export default props;

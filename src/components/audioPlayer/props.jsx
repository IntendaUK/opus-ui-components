const props = {
	value: {
		type: 'string',
		desc: 'The source where to get the audio from'
	},
	width: {
		type: 'string',
		desc: 'The width of the audio player'
	},
	height: {
		type: 'string',
		desc: 'The height of the audio player'
	},
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the audio player will have a label'
	},
	controls: {
		type: 'boolean',
		desc: 'When true, the audio player will have controls',
		dft: true
	},
	autoPlay: {
		type: 'boolean',
		desc: 'When true, the audio player will auto play',
		dft: true
	}
};

export default props;


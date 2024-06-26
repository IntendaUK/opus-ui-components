const props = {
	value: {
		type: 'string',
		desc: 'The source where to get the video from'
	},
	width: {
		type: 'string',
		desc: 'A string specifying the width of the video player'
	},
	height: {
		type: 'string',
		desc: 'A string specifying the height of the video player'
	},
	controls: {
		type: 'boolean',
		desc: 'When true, the video player\'s controls will be shown'
	},
	autoPlay: {
		type: 'boolean',
		desc: 'When true, the video player will autoplay'
	},
	type: {
		type: 'string',
		desc: 'A string that specifies the type of video being played'
	},
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the video player will have a label'
	}
};

export default props;


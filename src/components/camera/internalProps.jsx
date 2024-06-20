const props = {
	src: {
		type: 'string',
		desc: 'The source where to get the image from',
		internal: true
	},
	canvasRef: {
		type: 'refObject',
		desc: 'A pointer reference to the canvas element',
		internal: true
	},
	videoRef: {
		type: 'refObject',
		desc: 'A pointer reference to the video element',
		internal: true
	}
};

export default props;

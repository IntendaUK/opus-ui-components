const props = {
	isRecording: {
		type: 'boolean',
		desc: 'When true, the audio recorder is recording',
		dft: false,
		internal: true
	},
	value: {
		type: 'string',
		desc: 'The source where to get the audio from',
		internal: true
	},
	stream: {
		type: 'mediaStream',
		desc: 'A stream of the audio media content',
		internal: true
	},
	recorder: {
		type: 'mediaRecorder',
		desc: 'A mediaStream recorder that provides functionality to record',
		internal: true
	}
};

export default props;

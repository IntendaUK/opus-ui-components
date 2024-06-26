import internalProps from './internalProps';

const props = {
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the camera will have a label'
	},
	defaultToCamera: {
		type: 'boolean',
		desc: 'When true, the camera will be shown by default',
		dft: false
	},
	hideFunctions: {
		type: 'boolean',
		desc: 'When true, the camera functions will be shown'
	},
	handleOnImageTaken: {
		type: 'function',
		desc: 'A handler which is executed when the image is taken'
	},
	handleOnClear: {
		type: 'function',
		desc: 'A handler which is executed when the clear button is pressed'
	},
	handleOnVideoRefChanged: {
		type: 'function',
		desc: 'A handler which is executed the video source changes'
	}
};

export default Object.assign(
	props,
	internalProps
);

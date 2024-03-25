import { stopRecording } from './helpers';

const onStreamDataAvailable = ({ setState }, { data: streamData }) => {
	const value = URL.createObjectURL(streamData);

	setState({ value });
};

export const onRecordClick = async props => {
	const { setState } = props;

	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const recorder = new MediaRecorder(stream);

	setState({
		recorder,
		stream,
		isRecording: true
	});

	recorder.start();
};

export const onStopClick = props => {
	const { setState, state: { recorder, stream } } = props;
	recorder.ondataavailable = onStreamDataAvailable.bind(null, props);

	stopRecording(setState, recorder, stream);
};

export const onCancelClick = ({ setState, state: { recorder, stream } }) => {
	stopRecording(setState, recorder, stream, true);
};

export const onClearClick = ({ setState }) => {
	setState({ deleteKeys: ['value'] });
};

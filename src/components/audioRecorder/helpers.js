export const stopRecording = (setState, recorder, stream) => {
	recorder.stop();
	stream.getAudioTracks()[0].stop();

	setState({
		isRecording: false,
		deleteKeys: ['recorder', 'stream']
	});
};

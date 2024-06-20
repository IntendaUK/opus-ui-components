export const onVideoRefChanged = (props, videoRef) => {
	const { setState, state: { handleOnVideoRefChanged } } = props;
	const video = videoRef.current;

	(async () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			video.srcObject = stream;
			video.play();
		}
	})();

	setState({ videoRef });

	if (handleOnVideoRefChanged)
		handleOnVideoRefChanged(videoRef);
};

export const onCanvasRefChanged = (setState, canvasRef) => {
	setState({ canvasRef });
};

export const onClearWebClick = ({ state: { canvasRef, handleOnClear } }) => {
	const canvas = canvasRef.current;
	const context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);

	if (handleOnClear)
		handleOnClear();
};

export const onClearMobileClick = ({ setState }) => {
	setState({ deleteKeys: ['src'] });
};

export const onCaptureClick = props => {
	const { state: { videoRef, canvasRef, handleOnImageTaken } } = props;

	const canvas = canvasRef.current;
	const context = canvas.getContext('2d');

	context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

	if (handleOnImageTaken)
		handleOnImageTaken(canvas.toDataURL());
};

export const onInputChange = ({ setState, state: { handleOnImageTaken } }, ref) => {
	setState({ src: URL.createObjectURL(ref.current.files[0]) });
	if (handleOnImageTaken)
		handleOnImageTaken(URL.createObjectURL(ref.current.files[0]));
};

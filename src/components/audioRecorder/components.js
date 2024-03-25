import React, { useContext } from 'react';

import { createContext } from 'opus-ui';
import { onRecordClick, onStopClick, onCancelClick, onClearClick } from './events';

const AudioRecorderContext = createContext('audioRecorder');

export const Button = ({ cpt, handlerOnClick, vis }) => {
	const props = useContext(AudioRecorderContext);
	const { id, ChildWgt } = props;

	if (!vis)
		return null;

	return (
		<ChildWgt mda={{
			id,
			index: cpt,
			type: 'button',
			prps: {
				handlerOnClick,
				cpt
			}
		}} />
	);
};

const RecordIndicator = () => {
	const props = useContext(AudioRecorderContext);
	const { state: { isRecording } } = props;

	const inner = isRecording ? 'Recording' : 'No Audio Recorded';

	return (
		<div className='indicatorText'>{inner}</div>
	);
};

const AudioPlayer = () => {
	const { id, ChildWgt, state: { value } } = useContext(AudioRecorderContext);

	return (
		<ChildWgt mda={{
			id,
			index: 'player',
			type: 'audioPlayer',
			prps: {
				value,
				autoPlay: false
			}
		}} />
	);
};

const Top = () => {
	const props = useContext(AudioRecorderContext);
	const { state: { isRecording, value } } = props;

	let inner = null;
	if (isRecording || !value)
		inner = <RecordIndicator />;
	else if (value)
		inner = <AudioPlayer />;

	return (
		<div className='top'>
			{inner}
		</div>
	);
};

const Toolbar = () => {
	const props = useContext(AudioRecorderContext);
	const { state: { isRecording, value } } = props;

	const handlerRecord = onRecordClick.bind(null, props);
	const handlerStop = onStopClick.bind(null, props);
	const handlerCancel = onCancelClick.bind(null, props);
	const handlerClear = onClearClick.bind(null, props);

	return (
		<div className='toolbar'>
			<Button
				cpt='Record'
				vis={!isRecording}
				handlerOnClick={handlerRecord}
			/>
			<Button
				cpt='Clear'
				vis={!!value}
				handlerOnClick={handlerClear}
			/>
			<Button
				cpt='Stop'
				vis={isRecording}
				handlerOnClick={handlerStop}
			/>
			<Button
				cpt='Cancel'
				vis={isRecording}
				handlerOnClick={handlerCancel}
			/>
		</div>
	);
};

export const Box = () => {
	return (
		<div className='box'>
			<Top />
			<Toolbar />
		</div>
	);
};

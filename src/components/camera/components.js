import React, { useEffect, useContext, useRef } from 'react';

import { createContext } from '@intenda/opus-ui';

import { onCanvasRefChanged,
	onVideoRefChanged,
	onClearWebClick,
	onCaptureClick,
	onInputChange,
	onClearMobileClick } from './events';

const CameraContext = createContext('camera');

export const Button = ({ cpt, fn }) => {
	const { id, ChildWgt } = useContext(CameraContext);

	return (
		<ChildWgt mda={{
			id,
			index: cpt,
			type: 'button',
			prps: {
				handlerOnClick: fn,
				cpt
			}
		}} />
	);
};

const Video = () => {
	const props = useContext(CameraContext);

	const ref = useRef(null);
	useEffect(onVideoRefChanged.bind(null, props, ref), [ref]);

	return (
		<video
			ref={ref}
			autoPlay
		/>
	);
};

const MobileUpload = () => {
	const props = useContext(CameraContext);
	const { id, ChildWgt, state: { defaultToCamera } } = props;

	const handlerOnChange = onInputChange.bind(null, props);

	return (
		<ChildWgt mda={{
			id,
			index: 'upload',
			type: 'upload',
			prps: {
				handlerOnChange,
				buttonIcon: 'camera',
				defaultToCamera,
				showFileList: false
			}
		}} />
	);
};

const WebBox = () => {
	const props = useContext(CameraContext);

	const canvasRef = useRef();
	useEffect(onCanvasRefChanged.bind(null, props.setState, canvasRef), [canvasRef]);

	return (
		<div className='box'>
			<div className='innerVideo'>
				<Video />
				<canvas
					ref={canvasRef}
					width={640}
					height={480}
				/>
			</div>
			<Buttons />
		</div>
	);
};

const MobileBox = () => {
	const props = useContext(CameraContext);
	const fnClear = onClearMobileClick.bind(null, props);

	return (
		<div className='box'>
			<div className='innerVideo'>
				<MobileUpload />
				<Image />
			</div>
			<div className='innerOptions'>
				<Button
					icon='clear'
					cpt='Clear'
					fn={fnClear}
				/>
			</div>
		</div>
	);
};

const Image = () => {
	const { state: { src } } = useContext(CameraContext);
	if (!src)
		return null;

	return (
		<img
			alt='img'
			src={src}
		/>
	);
};

export const Box = () => {
	const Type = window.isMobile ? MobileBox : WebBox;

	return <Type />;
};

const Buttons = () => {
	const props = useContext(CameraContext);
	const { state: { hideFunctions } } = props;

	if (hideFunctions)
		return null;

	const fnCapture = onCaptureClick.bind(null, props);
	const fnClear = onClearWebClick.bind(null, props);

	return (
		<div className='innerOptions'>
			<Button
				icon='snap'
				cpt='Snap'
				fn={fnCapture}
			/>
			<Button
				icon='clear'
				cpt='Clear'
				fn={fnClear}
			/>
		</div>
	);
};

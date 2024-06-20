import React from 'react';

import './styles.css';

const renderVideoPlayer = props => {
	const { value, type, controls, autoPlay, width, height, attributes } = props.state;

	const format = 'video/' + type;

	const inputProps = {};

	const addControls = controls ? { controls } : {};
	Object.assign(inputProps, addControls);

	//Autoplay will only play once when loaded
	const addAutoPlay = autoPlay ? { autoPlay } : {};
	Object.assign(inputProps, addAutoPlay);

	return (
		<div className='box'>
			<video
				className='video'
				style={
					{
						height,
						width
					}
				}
				{...attributes}
				{...inputProps}>
				<source
					className='videoSource'
					src={value}
					type={format}
				/>
			</video>
		</div>
	);
};

export const VideoPlayer = props => {
	const { id, classNames } = props;

	return (
		<div id={id} className={classNames}>
			{renderVideoPlayer(props)}
		</div>
	);
};

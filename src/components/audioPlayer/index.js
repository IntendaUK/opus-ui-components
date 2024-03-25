import React from 'react';

import './styles.css';

const renderAudioPlayer = (
	{ state: { value, audioType = 'audio/mp3', controls, autoPlay, width, height } }
) => {
	const inputProps = {};

	const addControls = controls ? { controls } : {};
	Object.assign(inputProps, addControls);

	//Autoplay will only play once when loaded
	const addAutoPlay = autoPlay ? { autoPlay } : {};
	Object.assign(inputProps, addAutoPlay);

	return (
		<div className='box'>
			<audio
				className='audio'
				style={
					{
						height,
						width
					}
				}
				{...inputProps}>
				<source
					className='audioSource'
					src={value}
					type={audioType} />
			</audio>
		</div>
	);
};

export const AudioPlayer = props => {
	const { id, classNames, attributes } = props;

	return (
		<div
			id={id}
			className={classNames}
			{...attributes}>
			{renderAudioPlayer(props)}
		</div>
	);
};

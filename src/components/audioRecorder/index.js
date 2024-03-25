import React from 'react';

import { createContext } from 'opus-ui';

import './styles.css';
import { Box } from './components';

const AudioRecorderContext = createContext('audioRecorder');

export const AudioRecorder = props => {
	const { id, classNames, attributes } = props;

	return (
		<AudioRecorderContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				{...attributes}>
				<Box />
			</div>
		</AudioRecorderContext.Provider>
	);
};

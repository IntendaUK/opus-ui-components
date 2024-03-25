import React from 'react';

import { createContext } from 'opus-ui';

import './styles.css';
import { Box } from './components';

const CameraContext = createContext('camera');

export const Camera = props => {
	const { id, classNames, attributes } = props;

	return (
		<CameraContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				{...attributes}>
				<Box />
			</div>
		</CameraContext.Provider>
	);
};

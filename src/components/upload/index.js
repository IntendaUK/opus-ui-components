import React, { useRef, useEffect } from 'react';

import { createContext } from 'opus-ui';

import './styles.css';

import { onMount, openFileSelector } from './events';
import { UploadComponent } from './components';

const UploadContext = createContext('upload');

export const Upload = props => {
	const { id, getHandler, classNames, state, style, attributes } = props;
	const { tOpenFileSelector } = state;

	const ref = useRef(null);

	useEffect(getHandler(onMount, ref), []);
	useEffect(getHandler(openFileSelector, ref), [tOpenFileSelector]);

	return (
		<UploadContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				ref={ref}
				style={style}
				{...attributes}
			>
				<UploadComponent />
			</div>
		</UploadContext.Provider>
	);
};

import React, { useEffect, useContext, useRef } from 'react';

import { createContext } from 'opus-ui';

import { onInputRefChanged } from './events';
import { handleFiles } from './events';

const UploadContext = createContext('upload');

const HiddenInput = () => {
	const props = useContext(UploadContext);
	const { getHandler, state: { defaultToCamera = false, files, canSelectMultiple } } = props;

	const inputRef = useRef(null);
	useEffect(getHandler(onInputRefChanged, inputRef), []);

	const fn = getHandler(handleFiles, inputRef);

	return (
		<input
			capture={defaultToCamera}
			files={files}
			multiple={canSelectMultiple}
			className='hiddenInput'
			type='file'
			onChange={fn}
			ref={inputRef}
		/>
	);
};

export const UploadComponent = () => {
	return (
		<>
			<HiddenInput />
		</>
	);
};


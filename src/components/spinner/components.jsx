import React from 'react';

import { generateClassNames } from '@intenda/opus-ui';

import { determineTransform } from './helpers';

export const indeterminateSpinner = () => {
	return (
		<div className='spinner'>
			<div className='wrapper'>
				<div className='leftWrapper'>
					<div className='left'>
						<div className='circle' />
					</div>
				</div>
				<div className='rightWrapper'>
					<div className='right'>
						<div className='circle' />
					</div>
				</div>
			</div>
		</div>
	);
};

export const determinateSpinner = value => {
	const val = value + '%';
	const tform = determineTransform(value);

	const left = generateClassNames('left-side', { fill: value > 50 });

	return (
		<div className='player'>
			<div className='progress'>
				<div className='right-side' />
				<div className={left} style={{ transform: tform }} />
			</div>
			<div className='player-text'>{val}</div>
		</div>

	);
};

export const Filler = ({ value }) => {
	if (!value)
		return indeterminateSpinner();

	return determinateSpinner(value);
};

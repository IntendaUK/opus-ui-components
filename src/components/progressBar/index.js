//React
import React from 'react';

//External Helpers
import { Popover } from 'opus-ui';

//Styles
import './styles.css';

export const ProgressBar = props => {
	const { id, classNames, style, attributes } = props;

	return (
		<div
			id={id}
			className={classNames}
			style={style}
			{...attributes}
		>
			<Popover props={props} />
			<div className='bar' />
		</div>
	);
};

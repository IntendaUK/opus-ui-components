//React
import React from 'react';

//External Helpers
import { Popover } from 'opus-ui';

//Components
import { Filler } from './components.js';

//Styles
import './styles.css';

export const Spinner = props => {
	const { id, classNames, attributes, state: { value } } = props;

	return (
		<div
			id={id}
			className={classNames}
			{...attributes}>
			<Popover props={props} />
			<Filler value={value} />
		</div>
	);
};

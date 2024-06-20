//React
import React from 'react';

//External Helpers
import { Popover } from '@intenda/opus-ui';

//Components
import { Filler } from './components';

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

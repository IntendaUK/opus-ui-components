//React
import React, { useEffect } from 'react';

//Styles
import './styles.css';

//Events
import { onValueChange, onValueStringChange } from './events';

//Helpers
import { wrapJson } from './helpers';

//Components
export const Code = props => {
	const { id, getHandler, classNames, attributes, state: { value, valueString } } = props;

	useEffect(getHandler(onValueChange), [value]);
	useEffect(getHandler(onValueStringChange), [valueString]);

	return (
		<pre
			id={id}
			className={classNames}
			{...attributes}
			dangerouslySetInnerHTML={{ __html: wrapJson(valueString) }}
		/>
	);
};

//React
import React from 'react';

//Styles
import './styles.css';

//Export
export const Divider = ({ id, style, classNames, attributes }) => {
	return (
		<div
			id={id}
			className={classNames}
			style={style}
			{...attributes}
		/>
	);
};

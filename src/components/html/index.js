//Type: Platform Component
//Desc: renders a Platform Component - Html

import React from 'react';

import './styles.css';

//Type: Functional Component
//Name: Html
//Desc: Main Platform Component - Html
//Args:
//	props	object	The System props object
export const Html = ({ id, style, classNames, attributes, state: { tpl } }) => {
	return (
		<div
			id={id}
			style={style}
			className={classNames}
			{...attributes}
			dangerouslySetInnerHTML={{ __html: tpl }}
		/>
	);
};

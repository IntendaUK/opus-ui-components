import React from 'react';

import './styles.css';

const renderIframe = ({ id, state }) => {
	const { value, enableScroll, title, attributes } = state;

	return (
		<iframe
			id={id}
			className='iframe'
			scrolling={enableScroll}
			src={value}
			title={title}
			{...attributes}
		/>
	);
};

export const Url = props => {
	const { id, style, classNames, state: { value } } = props;

	if (!value)
		return null;

	return (
		<div
			id={id} style={style}
			className={classNames}>
			{renderIframe(props)}
		</div>
	);
};

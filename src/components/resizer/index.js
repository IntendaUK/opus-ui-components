//React
import React from 'react';

//System
import { createContext, wrapWidgets } from '@intenda/opus-ui';

//Styles
import './styles.css';

//Context
const ResizerContext = createContext('mover');

let cbResize = null;
let cbRelease = null;

//Events
const onResize = ({ setState, state: { grabX, grabY } }, { screenX, screenY }) => {
	setState({
		x: screenX,
		y: screenY,
		dx: screenX - grabX,
		dy: screenY - grabY
	});
};

const onRelease = ({ setState }) => {
	window.removeEventListener('mousemove', cbResize);
	window.removeEventListener('mouseup', cbRelease);

	setState({
		isResizing: false,
		deleteKeys: [
			'x',
			'y',
			'dx',
			'dy'
		]
	});
};

const onGrab = (props, { screenX, screenY }) => {
	const { setState } = props;

	cbResize = onResize.bind(null, props);
	cbRelease = onRelease.bind(null, props);

	window.addEventListener('mousemove', cbResize);
	window.addEventListener('mouseup', cbRelease);

	setState({
		isResizing: true,
		grabX: screenX,
		grabY: screenY
	});
};

//Helpers
const getWgts = props => {
	const { children, state: { vis } } = props;

	if (!vis)
		return null;

	const result = wrapWidgets(props);

	if (children) {
		if (children.length)
			result.push(...children);
		else
			result.push(children);
	}

	return result;
};

//Components
export const Resizer = props => {
	const { id, getHandler, classNames, style, attributes } = props;

	const handlerOnGrab = getHandler(onGrab);
	const handlerOnRelease = getHandler(onRelease);

	const inner = getWgts(props);

	return (
		<ResizerContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
				onMouseDown={handlerOnGrab}
				onMouseUp={handlerOnRelease}
			>
				{inner}
			</div>
		</ResizerContext.Provider>
	);
};

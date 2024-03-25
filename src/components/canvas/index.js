//React
import React, { useEffect, useRef, useMemo } from 'react';

//System
import { createContext, resolveThemeAccessor } from 'opus-ui';

//Styles
import './styles.css';

//Plugins
import SignatureCanvas from 'react-signature-canvas';

//Context
const CanvasContext = createContext('canvas');

//Events
export const onSetRef = ({ setState }, ref) => {
	setState({ ref });
};

export const onClear = ({ setState, state: { tClear, ref } }) => {
	if (!tClear)
		return;

	ref.current.clear();
	setState({ deleteKeys: ['tClear'] });
};

export const onLoadValue = ({ setState, state: { tLoadValue, ref } }) => {
	if (!tLoadValue || !ref)
		return;

	ref.current.fromDataURL(tLoadValue);

	setState({ deleteKeys: ['tLoadValue'] });
};

export const onClearAndLoadValue = ({ setState, state: { tClearAndLoadValue, ref } }) => {
	if (!tClearAndLoadValue || !ref)
		return;

	ref.current.clear();
	ref.current.fromDataURL(tClearAndLoadValue);

	setState({ deleteKeys: ['tClearAndLoadValue'] });
};

const onChanged = ({ setState, state: { ref } }) => {
	const value = ref.current.toDataURL();

	setState({ value });
};

//Helpers
const getCanvasJsx = ({ state: { penColor, penMinWidth, penMaxWidth } }, ref, handlerOnChanged) => {
	const usePenColor = resolveThemeAccessor(penColor);

	return (
		<SignatureCanvas
			ref={ref}
			penColor={usePenColor}
			minWidth={penMinWidth}
			maxWidth={penMaxWidth}
			onEnd={handlerOnChanged}
			canvasProps={{
				className: 'canvas',
				style: {
					width: '100%',
					height: '100%'
				}
			}}
		/>
	);
};

//Component
export const Canvas = props => {
	const { id, getHandler, classNames, style, state, attributes } = props;

	const { tClear, tLoadValue, tClearAndLoadValue } = state;

	const ref = useRef(null);
	useEffect(getHandler(onSetRef, ref), [ref]);
	useEffect(getHandler(onClear), [tClear]);
	useEffect(getHandler(onLoadValue), [tLoadValue, ref]);
	useEffect(getHandler(onClearAndLoadValue), [tClearAndLoadValue, ref]);

	const handlerOnChanged = getHandler(onChanged);

	const inner = useMemo(getCanvasJsx.bind(null, props, ref, handlerOnChanged), []);

	return (
		<CanvasContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
			>
				{inner}
			</div>
		</CanvasContext.Provider>
	);
};

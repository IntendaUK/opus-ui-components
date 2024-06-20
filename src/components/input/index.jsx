//React
import React, { useEffect } from 'react';

//System
import { createContext, useEffectSkipFirst, validate } from '@intenda/opus-ui';

//Components
import { Box } from './components';
import LookupLoader from './components/lookupLoader';

//Events
import onValueChange from './events/onValueChange';
import onCallHandler from './events/onCallHandler';
import onForceFocus from './events/onForceFocus';

//Styles
import './styles.css';

//Context
const InputContext = createContext('input');

//Export
export const Input = props => {
	const { id, style, classNames, getHandler, attributes, state } = props;
	const { value, lookupDtaObj, lookupData, lookupPrps, forceFocus } = state;

	useEffect(getHandler(validate), []);
	useEffect(getHandler(onValueChange), [value]);
	useEffectSkipFirst(getHandler(onCallHandler), value);
	useEffectSkipFirst(getHandler(onForceFocus), [forceFocus]);

	const hasLookupLoader = (
		lookupDtaObj ||
		lookupData ||
		(
			lookupPrps &&
			lookupPrps.dtaScps
		)
	);

	const lookupLoader = hasLookupLoader ? <LookupLoader /> : null;

	return (
		<InputContext.Provider value={props}>
			<div
				id={id}
				style={style}
				className={classNames}
				{...attributes}
			>
				<Box />
				{lookupLoader}
			</div>
		</InputContext.Provider>
	);
};

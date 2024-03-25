//React
import React, { useContext, useEffect } from 'react';

//System
import { createContext, wrapWidgets } from 'opus-ui';

//Styles
import './styles.css';

//Context
const TabContainerContext = createContext('tabContainer');

export const Tab = props => {
	const { id, classNames, getHandler, attributes, state } = props;
	const { cpt, enabled, active, visible } = state;

	const { notifyParent } = useContext(TabContainerContext);
	useEffect(getHandler(notifyParent), [cpt, enabled, active, visible]);

	if (!active)
		return null;

	return (
		<div
			id={id}
			className={classNames}
			{...attributes}>
			{wrapWidgets(props)}
		</div>
	);
};

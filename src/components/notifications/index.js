//React
import React, { useEffect } from 'react';

//System
import { createContext } from 'opus-ui';

//Styles
import './styles.css';

//Components
import { NotificationList } from './components';

//Events
import { onGetMessage, onRemoveMsgMessage } from './events';

//Helpers
import { requestPermissions } from './helpers';

//Context
const NotificationContext = createContext('Notifications');

export const Notifications = props => {
	const { id, getHandler,	style, classNames, attributes, state } = props;
	const { newMsg, removeMsg } = state;

	useEffect(requestPermissions, []);
	useEffect(getHandler(onGetMessage), [newMsg]);
	useEffect(getHandler(onRemoveMsgMessage), [removeMsg]);

	return (
		<NotificationContext.Provider value={props}>
			<div
				id={id}
				style={style}
				className={classNames}
				{...attributes}
			>
				<NotificationList />
			</div>
		</NotificationContext.Provider>
	);
};

import React, { useContext } from 'react';

import { createContext, generateClassNames } from '@intenda/opus-ui';

import { onClose } from './events';

const NotificationContext = createContext('Notifications');

const Label = ({ msgKey, cpt, prpsLabel }) => {
	const { ChildWgt } = useContext(NotificationContext);

	return <ChildWgt mda={{
		id: msgKey,
		type: 'label',
		index: 'label',
		prps: {
			cpt,
			...prpsLabel
		}
	}} />;
};

const Icon = ({ msgKey, closeHandler, autoClose, prpsIcon }) => {
	const { ChildWgt } = useContext(NotificationContext);

	if (autoClose)
		return null;

	return <ChildWgt mda={{
		type: 'icon',
		index: 'icon',
		prps: {
			value: 'close',
			handlerOnClick: closeHandler,
			...prpsIcon
		},
		id: msgKey
	}} />;
};

const Notification = ({ msgKey, config }) => {
	const { getHandler, state } = useContext(NotificationContext);
	const { prpsLabel, prpsIcon } = state;
	const { msg, type, closing, autoClose = true } = config;

	const className = generateClassNames('notification', {
		[type]: type,
		closing
	});

	const closeHandler = !autoClose ? getHandler(onClose, msgKey, config) : null;

	return (
		<div className={className}>
			<Label
				msgKey={msgKey}
				cpt={msg}
				prpsLabel={prpsLabel}
			/>
			<Icon
				msgKey={msgKey}
				closeHandler={closeHandler}
				autoClose={autoClose}
				prpsIcon={prpsIcon}
			/>
		</div>
	);
};

const CustomNotification = ({ msgKey, config: { msg, type, closing } }) => {
	const { id, ChildWgt, state: { msgTypeMda } } = useContext(NotificationContext);

	const prpsToInject = {
		notificationsComponentId: id,
		notificationId: msgKey,
		msg
	};

	let mda = msgTypeMda[type];

	if (mda.blueprint) {
		mda = {
			blueprint: mda.blueprint,
			blueprintPrps: {
				...mda.blueprintPrps,
				...prpsToInject
			}
		};
	} else {
		if (!mda.prps)
			mda.prps = {};

		Object.keys(prpsToInject).forEach(k => {
			mda.prps[k] = prpsToInject[k];
		});
	}

	const className = generateClassNames('notification customNotification', { closing });

	return (
		<div className={className}>
			<ChildWgt mda={mda} />
		</div>
	);
};

export const NotificationList = () => {
	const { state } = useContext(NotificationContext);
	const { msgTypeMda } = state;

	return (
		Object.entries(state)
			.filter(([key, val]) => {
				return key.indexOf('message_') === 0 && val;
			})
			.map(([key, val]) => {
				const NotificationComponent = msgTypeMda && msgTypeMda[val.type]
					? CustomNotification
					: Notification;

				return (
					<NotificationComponent
						key={key}
						msgKey={key}
						config={val} />
				);
			})
	);
};

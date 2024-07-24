import { generateGuid } from '@intenda/opus-ui';

import { notifyGlobally } from './helpers';

export const onClose = ({ setState }, key) => {
	const newState = {
		deleteKeys: [
			key,
			'removeMsg'
		]
	};

	setState(newState);
};

export const onRemoveMsgMessage = props => {
	const { state } = props;
	const { removeMsg } = state;

	if (!removeMsg)
		return;

	const { notificationId } = removeMsg;

	const config = state[notificationId];

	onClose(props, notificationId, config);
};

export const onGetMessage = ({ getHandler, setState, state }) => {
	const { newMsg: messageArray, duration } = state;

	if (!messageArray.length)
		return;

	const newState = { deleteKeys: ['newMsg'] };

	messageArray.forEach(m => {
		const { msg, autoClose = true, duration: durationOverride, isGlobal = false } = m;

		if (isGlobal) {
			notifyGlobally(msg);

			return;
		}

		const guidOfMsg = `message_${generateGuid()}`;
		newState[guidOfMsg] = m;

		const useDuration = durationOverride || duration;

		if (autoClose)
			setTimeout(getHandler(onClose, guidOfMsg), useDuration);
	});

	setState(newState);
};

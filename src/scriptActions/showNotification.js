const buildMessageFromConfig = config => {
	const {
		msgType: type = 'info',
		autoClose = true,
		isGlobal = false,
		msg,
		duration
	} = config;

	return {
		msg,
		type,
		autoClose,
		isGlobal,
		duration
	}
};

const showNotification = ({ target = 'NOTIFICATIONS', value, ...config }, scriptId, { setWgtState }) => {
	if (!value) {
		setWgtState(target, {
			newMsg: buildMessageFromConfig(config)
		});

		return;
	}

	setWgtState(target, {
		newMsg: value.map(c => buildMessageFromConfig(c))
	});
};

export default showNotification;

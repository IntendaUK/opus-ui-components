export const requestPermissions = () => {
	if (!window.Notification)
		return;

	if (Notification.permission !== 'granted')
		Notification.requestPermission();
};

const createNotification = msg => {
	const notification = new Notification(msg);

	return notification;
};

export const notifyGlobally = msg => {
	if (!msg)
		return;

	if (Notification.permission !== 'granted')
		requestPermissions();
	else
		createNotification(msg);
};

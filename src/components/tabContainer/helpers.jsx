export const buildOptions = ({ state }, tabId) => {
	const isPinnedKey = `${tabId}-pinned`;

	const { hasCloseOption, [isPinnedKey]: isPinned } = state;

	const pinAction = isPinned ? 'Unpin Tab' : 'Pin Tab';

	const optionStrings = [pinAction];

	if (hasCloseOption)
		optionStrings.push('Close Tab');

	const options = optionStrings.map(action => {
		return { action };
	});

	return options;
};

import { buildOptions } from './helpers';

export const onTabStateChange = (
	{ setState },
	{ id: tabId, state: { active } }
) => {
	let newState = {};

	if (active)
		newState.activeTab = tabId;

	setState(newState);
};

const onContextActionClick = ({ setState, state }, tabId, { action }) => {
	if (action.toLowerCase().includes('pin')) {
		const stateName = `${tabId}-pinned`;
		setState({ [stateName]: !state[stateName] });
	}

	if (action.toLowerCase().includes('close')) {
		const { handlerOnCloseTab } = state;
		handlerOnCloseTab(tabId);
	}
};

export const onTabRightClick = (props, tabRef, tabId, e) => {
	const { id, getHandler } = props;

	const lookupData = buildOptions(props, tabId);

	props.setWgtState('POPUP1', {
		display: true,
		domNode: tabRef.current,
		lookupData,
		handlerOnOptionClick: getHandler(onContextActionClick, tabId),
		lookupWgts: [{ id: 'action' }],
		fromId: id,
		lookupFlows: []
	});

	e.preventDefault();
};

export const onTabClick = ({ wgts, setWgtState }, tabId) => {
	wgts.forEach(prps => {
		if (prps.id !== tabId)
			setWgtState(prps.id, { active: false });
	});

	setWgtState(tabId, { active: true });
};

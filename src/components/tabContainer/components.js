import React, { useContext } from 'react';

import { createContext } from 'opus-ui';

import { onTabClick } from './events';

const TabContainerContext = createContext('tabContainer');

const TabButton = ({ tabId, buttonId, cpt, icon, enabled, active }) => {
	const { getHandler, state, ChildWgt } = useContext(TabContainerContext);
	const { prpsTabButton, prpsTabButtonActive } = state;

	const handlerOnClick = getHandler(onTabClick, tabId);

	const useProps = {
		cpt,
		icon,
		handlerOnClick,
		enabled,
		...prpsTabButton
	};

	if (active)
		Object.assign(useProps, prpsTabButtonActive);

	return <ChildWgt mda={{
		id: buttonId,
		type: 'button',
		prps: useProps,
		auth: Object.keys(useProps)
	}} />;
};

export const TabButtons = () => {
	const { wgts, getWgtState, state } = useContext(TabContainerContext);
	const { activeTab, hideSingle } = state;

	if (hideSingle && wgts.length === 1)
		return null;

	return (
		<div className='tabButtons'>
			{wgts.map(({ id: tabId, prps: tabPrps }) => {
				const tabState = getWgtState(tabId);
				const isActive = tabId === activeTab;

				const buttonId = `${tabId}-button`;

				return (
					<TabButton
						key={buttonId}
						tabId={tabId}
						buttonId={buttonId}
						active={isActive}
						{...tabPrps}
						{...tabState}
					/>
				);
			})}
		</div>
	);
};

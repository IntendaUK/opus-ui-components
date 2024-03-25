//React
import React from 'react';

//System
import { createContext, wrapWidgets, generateClassNames } from 'opus-ui';

//Styles
import './styles.css';

//Components
import { TabButtons } from './components';

//Events
import { onTabStateChange } from './events';

//Context
const TabContainerContext = createContext('tabContainer');

//Components

export const TabContainer = props => {
	const { id, wgts, attributes, classNames: classNamesBase } = props;

	const classNames = generateClassNames(classNamesBase, { single: wgts.length === 1 });

	return (
		<TabContainerContext.Provider value={{
			...props,
			notifyParent: onTabStateChange.bind(null, props)
		}}>
			<div
				id={id}
				className={classNames}
				{...attributes}>
				<TabButtons />
				<div className='content'>
					{wrapWidgets(props)}
				</div>
			</div>
		</TabContainerContext.Provider>
	);
};

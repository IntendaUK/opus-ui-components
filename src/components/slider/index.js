//React
import React from 'react';

//Custom Hooks

//System
import { createContext, Popover } from '@intenda/opus-ui';

//Styles
import './styles.css';
import 'rc-slider/assets/index.css';

//Components
import { SliderInner } from './components';

//Context
const SliderContext = createContext('slider');

export const Slider = props => {
	const { id, classNames, style, attributes } = props;

	return (
		<SliderContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
			>
				<Popover props={props} />
				<SliderInner />
			</div>
		</SliderContext.Provider>
	);
};

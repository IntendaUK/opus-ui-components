//React
import React, { useContext, useEffect, useMemo, useState } from 'react';

//System
import { createContext, useEffectSkipFirst } from '@intenda/opus-ui';

//Events
import { onAfterChange, onCallHandler, onChange, onValueManuallySet } from './events';

//Plugins
import RCSlider from 'rc-slider';

//Context
const SliderContext = createContext('slider');

//Helpers
const getDiscreteIntervals = (intervals, min, max) => {
	const intervalMap = {};

	for (let i = min; i <= max; i += intervals)
		intervalMap[i] = i;

	return intervalMap;
};

//Components
export const SliderWithTooltip = props => {
	const { state: { tooltipPosition } } = useContext(SliderContext);

	const RCSliderWithTooltip = useMemo(() => RCSlider.createSliderWithTooltip(RCSlider), []);

	const tooltipPrps = { placement: tooltipPosition };

	return <RCSliderWithTooltip tipProps={tooltipPrps} {...props} />;
};

export const SliderInner = () => {
	const { getHandler, state } = useContext(SliderContext);
	const { value, vertical, min, max, isDiscrete, interval, hasTooltip } = state;

	const [localStateValue, setLocalValue] = useState(value);

	const handlerOnChange = getHandler(onChange, setLocalValue);
	const handlerOnAfterChange = getHandler(onAfterChange, localStateValue);

	useEffect(getHandler(onValueManuallySet, setLocalValue, localStateValue), [value]);
	useEffectSkipFirst(getHandler(onCallHandler), value);

	const sliderProps = {
		min,
		max,
		isDiscrete,
		vertical,
		step: interval,
		value: localStateValue,
		onChange: handlerOnChange,
		onAfterChange: handlerOnAfterChange
	};

	sliderProps.marks = isDiscrete ? getDiscreteIntervals(interval, min, max) : {};

	const CustomSlider = hasTooltip ? SliderWithTooltip : RCSlider;

	return <CustomSlider {...sliderProps} />;
};

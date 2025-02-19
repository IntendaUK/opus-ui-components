//React
import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';

//System
import { createContext, ThemedComponent } from '@intenda/opus-ui';

//Plugins
import { useFloating } from '@floating-ui/react';
import 'keen-slider/keen-slider.min.css';

//Components
import Picker from './picker';

//Events
import { onToggle, onSelectAmPm, onChange, onValueOrAmPmChange } from './events';

//Styles
import './styles.css';

//Context
const TimePickerContext = createContext('timePicker');

//Components
const AmPmPicker = () => {
	const { getHandler, state: { amPm, twentyFourHours } } = useContext(TimePickerContext);

	if (twentyFourHours)
		return null;

	const options = ['AM', 'PM'];

	const els = options.map(h => {
		const className = `option${amPm === h ? ' selected' : ''}`;

		return (
			<div
				key={'am_' + h}
				className={className}
				onClick={getHandler(onSelectAmPm, h)}
			>
				{h}
			</div>
		);
	});

	return (
		<div className='column amPm'>
			{els}
		</div>
	);
};

const Clock = () => {
	const { state } = useContext(TimePickerContext);

	return (
		<div onClick={e => e.stopPropagation()} className='clock'>
			<Picker
				options={state.hourOptions}
				setKey='hours'
				value={state.hours}
				prpsSlider={state.prpsHourSlider}
				heading='Hours'
			/>
			<Picker
				options={state.minuteOptions}
				setKey='minutes'
				value={state.minutes}
				prpsSlider={state.prpsMinuteSlider}
				heading='Minutes'
			/>
			<AmPmPicker />
		</div>
	);
};

const Popup = ({ parentRef }) => {
	const { style, state: { active, popoverZIndex } } = useContext(TimePickerContext);

	const [popperElement, setPopperElement] = useState(null);
	const { refs, floatingStyles } = useFloating({
		elements: {
			reference: parentRef,
		},
		placement: 'bottom'
	});

	if (!active)
		return null;

	const container = document.getElementById('POPOVERS');

	const styles = {
		...floatingStyles,
		...style,
		zIndex: popoverZIndex
	};

	const el = (
		<div
			ref={refs.setFloating}
			style={styles}
			className='cpnTimePicker-popup'
		>
			<Clock />
		</div>
	);

	const res = ReactDOM.createPortal(el, container);

	return res;
};

const Value = () => {
	const { id, state: { active, amPm, showAmPm, prpsInput } } = useContext(TimePickerContext);

	const className = `value${active ? ' active' : ''}`;

	const inputFlowFromKey = amPm ? 'valueWithAmPm' : 'value';

	const prps = {
		...prpsInput,
		pointerEvents: 'none',
		flows: [
			{
				from: id,
				fromKey: inputFlowFromKey
			}
		]
	};

	if (showAmPm)
		prps.suffix = ` ${amPm}`;

	const auth = Object.keys(prps);

	return (
		<div className={className}>
			<ThemedComponent mda={{
				id: `${id}-value`,
				parentId: id,
				type: 'input',
				prps,
				auth
			}} />
		</div>
	);
};

//Exports
export const TimePicker = props => {
	const { id, style, classNames, getHandler, attributes, state } = props;
	const { value, hours, minutes, amPm } = state;

	useEffect(getHandler(onChange), [value, hours, minutes]);
	useEffect(getHandler(onValueOrAmPmChange), [value, amPm]);

	const [ref, setRef] = useState(null);

	const handlerOnClick = getHandler(onToggle);

	return (
		<TimePickerContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
				onClick={handlerOnClick}
				ref={setRef}
			>
				<Value />
				<Popup parentRef={ref} />
			</div>
		</TimePickerContext.Provider>
	);
};

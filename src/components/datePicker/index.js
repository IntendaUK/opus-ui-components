//React
import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

//System
import { createContext, ThemedComponent } from '@intenda/opus-ui';

//Component
import DatesBox from './datesBox';

//Events
import { onChangeMonth, onSync, onSelectedValueChange, onToggle, onOverrideValue } from './events';

//Plugins
import { usePopper } from 'react-popper';

//Styles
import './styles.css';

//Context
const DatePickerContext = createContext('datePicker');

//Components
const MonthDropdown = () => {
	const { state: { selectedMonthName, selectedYear } } = useContext(DatePickerContext);

	const dateString = [
		selectedMonthName,
		selectedYear
	].join(', ');

	return (
		<div className='monthDropdown'>
			{dateString}
		</div>
	);
};

const MonthNavigation = () => {
	const { getHandler } = useContext(DatePickerContext);

	return (
		<div className='monthNavigation'>
			<div className='button' onClick={getHandler(onChangeMonth, -1)}>&lt;</div>
			<div className='button' onClick={getHandler(onChangeMonth, 1)}>&gt;</div>
		</div>
	);
};

const DaysBar = () => {
	return (
		<div className='daysBar'>
			<div className='day'>S</div>
			<div className='day'>M</div>
			<div className='day'>T</div>
			<div className='day'>W</div>
			<div className='day'>T</div>
			<div className='day'>F</div>
			<div className='day'>S</div>
		</div>
	);
};

const Calendar = () => {
	return (
		<div className='calendar'>
			<div className='topBar'>
				<MonthDropdown />
				<MonthNavigation />
			</div>
			<DaysBar />
			<DatesBox />
		</div>
	);
};

const Popup = ({ parentRef }) => {
	const { stylePopup, state: { active, popoverZIndex } } = useContext(DatePickerContext);

	const [popperElement, setPopperElement] = useState(null);
	const popperProps = usePopper(parentRef, popperElement, { placement: 'bottom' });

	if (!active)
		return null;

	const { styles: stylesPopper, attributes } = popperProps;

	const container = document.getElementById('POPOVERS');

	const styles = {
		...stylesPopper.popper,
		...stylePopup,
		zIndex: popoverZIndex
	};

	const el = (
		<div
			ref={setPopperElement}
			style={styles}
			className='cpnDatePicker-popup'
			{...attributes.popper}
		>
			<Calendar />
		</div>
	);

	const res = ReactDOM.createPortal(el, container);

	return res;
};

const Value = () => {
	const { id, state: { active, prpsInput, valueFormatted } } = useContext(DatePickerContext);

	const className = `value${active ? ' active' : ''}`;

	const prps = {
		...prpsInput,
		pointerEvents: 'none',
		value: valueFormatted
	};

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
export const DatePicker = props => {
	const { id, style, classNames, getHandler, attributes, state } = props;
	const { day, month, year, selectedDay, selectedMonth, selectedYear, value, valueOverride } = state;

	useEffect(getHandler(onOverrideValue), [valueOverride]);
	useEffect(getHandler(onSync), [value, day, month, year]);
	useEffect(getHandler(onSelectedValueChange), [selectedDay, selectedMonth, selectedYear]);

	const [ref, setRef] = useState(null);

	return (
		<DatePickerContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
				onClick={getHandler(onToggle)}
				ref={setRef}
			>
				<Value />
				<Popup parentRef={ref} />
			</div>
		</DatePickerContext.Provider>
	);
};

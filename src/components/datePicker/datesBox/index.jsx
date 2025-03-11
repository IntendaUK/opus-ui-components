//React
import React, { useContext } from 'react';

//System
import { createContext, generateClassNames } from '@intenda/opus-ui';

//Helpers
import { canSelectDate } from './helpers';

//Context
const DatePickerContext = createContext('datePicker');

//Events
export const onSelectDate = (
	{ setState, state: { day, month, year, selectedMonth, selectedYear } }, newDay, e
) => {
	e.stopPropagation();

	if (day === newDay && month === selectedMonth && year === selectedYear)
		return;

	setState({
		day: newDay,
		month: selectedMonth,
		year: selectedYear,
		active: false,
		deleteKeys: ['valueOverride']
	});
};

//Components
const DateCell = ({ date }) => {
	const props = useContext(DatePickerContext);
	const { getHandler, state } = props;
	const { today, selectedDay, selectedMonth, selectedYear } = state;

	if (date < 1)
		return <div className='date empty' />;

	const isToday = (
		date === today.getDate() &&
		selectedMonth === today.getMonth() &&
		selectedYear === today.getFullYear()
	);

	const onClick = getHandler(onSelectDate, date);
	const canSelect = canSelectDate(props, date);

	const className = generateClassNames('date', {
		today: isToday,
		selected: date === selectedDay,
		disabled: !canSelect
	});

	return (
		<div
			className={className}
			onClick={onClick}
		>
			{date}
		</div>
	);
};

const DatesBox = () => {
	const { state: { selectedMonth, selectedYear } } = useContext(DatePickerContext);

	const firstDay = new Date(selectedYear, selectedMonth, 1);
	const delta = firstDay.getDay();

	const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
	const daysInMonth = lastDay.getDate();

	const rowCount = Math.ceil((daysInMonth + delta + 1) / 7);

	const rows = [];
	let inc = 1;
	for (let i = 0; i < rowCount; i++) {
		const days = [];

		const dayCount = Math.min(7, (daysInMonth + delta) - (i * 7));

		for (let j = 0; j < dayCount; j++) {
			const date = inc - delta;

			days.push(<DateCell key={date} date={date} />);

			inc++;
		}

		rows.push(<div key={'row_' + i} className='row'>{days}</div>);
	}

	return (
		<div className='datesBox'>
			{rows}
		</div>
	);
};

//Exports
export default DatesBox;

import { dateFormatter } from '@intenda/opus-ui';

const onDayMonthYearChange = (
	{ state: { value, valueFormatted, day, month, year, format } }, newState
) => {
	if (day === undefined || month === undefined || year === undefined)
		return;

	const newDateObject = new Date(year, month, day, 0, 0, 0);

	const monthName = newDateObject.toLocaleString('default', { month: 'long' });

	const newValue = newDateObject.toString();

	const newValueFormatted = dateFormatter(newDateObject, format);

	if (valueFormatted !== newValueFormatted)
		newState.valueFormatted = newValueFormatted;

	if (value === newValue)
		return;

	Object.assign(newState,
		{
			dateObject: newDateObject,
			monthName,
			value: newValue
		});
};

const onValueChange = ({ state: { value, day, month, year } }, newState) => {
	const dateObject = new Date(value);

	const newDay = dateObject.getDate();
	const newMonth = dateObject.getMonth();
	const newYear = dateObject.getFullYear();

	if (day === newDay && month === newMonth && year === newYear)
		return;

	const monthName = dateObject.toLocaleString('default', { month: 'long' });

	Object.assign(newState, {
		day: newDay,
		month: newMonth,
		year: newYear,
		monthName
	});
};

export const onSync = props => {
	const { setState, state: { valueOverride } } = props;

	//If we're in the middle of overriding the value, don't do anything
	if (valueOverride !== undefined)
		return;

	const newState = {};

	onDayMonthYearChange(props, newState);

	if (!Object.keys(newState).length)
		onValueChange(props, newState);

	if (Object.keys(newState).length)
		setState(newState);
};

export const onSelectedValueChange = ({ setState, state }) => {
	const { selectedDay, selectedMonth, selectedYear } = state;

	if (state.selectedDay === undefined)
		return;

	const newDate = new Date(selectedYear, selectedMonth, selectedDay);

	//This probably seems very convoluted...
	// We need to create a new state because of overflow dates (like day = 0 or month = 13)
	// If we do it this way, the new date object will fix the values for us and then we just
	// check them in the filter after this
	const tempState = {
		selectedDay: newDate.getDate(),
		selectedMonth: newDate.getMonth(),
		selectedMonthName: newDate.toLocaleString('default', { month: 'long' }),
		daysInSelectedMonth: (new Date(selectedYear, selectedMonth + 1, 0)).getDate(),
		daysInPreviousMonth: (new Date(selectedYear, selectedMonth, 0)).getDate(),
		selectedYear: newDate.getFullYear()
	};

	const newState = Object.fromEntries(
		Object.entries(tempState).filter(([k, v]) => state[k] !== v)
	);

	if (Object.keys(newState).length)
		setState(newState);
};

export const onToggle = (
	{ setState, state: { active, day, month, year, monthName } },
	{ target }
) => {
	//When clicking on a disabled row, the event will propagate here, so we just ignore it
	if (target.classList.contains('row'))
		return;

	const newState = { active: !active };

	if (!active) {
		newState.selectedDay = day;
		newState.selectedMonth = month;
		newState.selectedMonthName = monthName;
		newState.selectedYear = year;
	} else
		newState.deleteKeys = ['selectedDay', 'selectedMonth', 'selectedYear'];

	setState(newState);
};

export const onChangeMonth = ({ setState, state: { selectedMonth, selectedYear } }, delta, e) => {
	e.stopPropagation();

	let newMonth = selectedMonth + delta;
	let newYear = selectedYear;

	if (newMonth === 12) {
		newMonth = 0;
		newYear++;
	} else if (newMonth === -1) {
		newMonth = 11;
		newYear--;
	}

	setState({
		selectedMonth: newMonth,
		selectedYear: newYear
	});
};

export const onOverrideValue = props => {
	const { setState, state } = props;
	const { valueOverride, format, day, month, year } = state;

	if (!valueOverride)
		return;

	const newState = {
		deleteKeys: ['valueOverride']
	};

	const fakeProps = {
		state: {
			value: valueOverride,
			day,
			month,
			year,
			format
		}
	};
	onValueChange(fakeProps, newState);

	delete fakeProps.state.value;
	Object.assign(fakeProps.state, newState);
	delete fakeProps.state.value;

	onDayMonthYearChange(fakeProps, newState);

	setState(newState);
};
export const onToggle = ({ setState, state: { active } }) => {
	setState({ active: !active });
};

export const onValueOrAmPmChange = ({ setState, state: { value, valueWithAmPm, amPm } }) => {
	if (!value || !amPm)
		return;

	const newValue = `${value} ${amPm}`;

	if (newValue === valueWithAmPm)
		return;

	setState({ valueWithAmPm: newValue });
};

export const onSelectAmPm = ({ setState, state: { amPm: amPmOld } }, amPm) => {
	if (amPm === amPmOld)
		return;

	setState({ amPm });
};

export const onChange = ({ setState, state: { value, hours, minutes } }) => {
	if (hours !== undefined && minutes !== undefined) {
		const newValue = [
			(hours + '').padStart(2, '0'),
			':',
			(minutes + '').padStart(2, '0')
		].join('');

		if (newValue !== value) {
			setState({
				value: newValue,
				hours,
				minutes
			});

			return;
		}
	}

	if (!value)
		return;

	const [ newHours, newMinutes ] = value.split(':').map(v => ~~v);

	if (newHours === hours && newMinutes === minutes)
		return;

	setState({
		hours: newHours,
		minutes: newMinutes
	});
};

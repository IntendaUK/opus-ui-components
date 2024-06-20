export const onValueChange = ({ setState, state: { value, valueString } }) => {
	try {
		const newValueString = JSON.stringify(value, null, '\t');
		if (newValueString !== valueString)
			setState({ valueString: newValueString });
	} catch (e) {}
};

export const onValueStringChange = ({ setState, state: { valueString } }) => {
	if (valueString === '{}')
		return;

	try {
		const parsed = JSON.parse(valueString);
		setState({ value: parsed });
	} catch (e) {}
};

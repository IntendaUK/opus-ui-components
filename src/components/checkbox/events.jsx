//These values are based on whether triState is true or not
const valuesConfig = {
	true: [false, true, null],
	false: [true, false]
};

export const onClick = ({ setState, state: { triState, value, readOnly } }) => {
	if (readOnly)
		return;

	const values = valuesConfig[triState];

	const currentIndex = values.indexOf(value);

	const newValue = values[(currentIndex + 1) % values.length];

	setState({ value: newValue });
};

export const onCallHandler = ({ state: { value, handlerOnChange } }) => {
	if (handlerOnChange)
		handlerOnChange(value);
};

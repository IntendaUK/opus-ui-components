//Events
export const onChange = (props, setLocalValue, value) => {
	setLocalValue(value);
};

export const onValueManuallySet = ({ state: { value } }, setLocalValue, localStateValue) => {
	if (localStateValue === value)
		return;

	setLocalValue(value);
};

export const onAfterChange = ({ setState, state: { value } }, localStateValue) => {
	if (localStateValue === value)
		return;

	setState({ value: localStateValue });
};

export const onCallHandler = ({ state: { value, handlerOnChange } }) => {
	if (handlerOnChange)
		handlerOnChange(value);
};

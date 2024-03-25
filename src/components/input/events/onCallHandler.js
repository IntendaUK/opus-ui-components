const onValueChange = ({ state: { value, handlerOnChange } }) => {
	if (handlerOnChange)
		handlerOnChange(value);
};

export default onValueChange;

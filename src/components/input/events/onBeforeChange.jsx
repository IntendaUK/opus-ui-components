const onBeforeChange = (props, e) => {
	const { state: { allowCharactersRegex } } = props;

	const regEx = new RegExp(allowCharactersRegex, 'g');

	const result = regEx.test(e.data);

	if (!result)
		e.preventDefault();
};

export default onBeforeChange;

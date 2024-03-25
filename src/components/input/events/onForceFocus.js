const onForceFocus = ({ setState, state: { forceFocus, boxRef } }) => {
	if (!forceFocus || !boxRef)
		return;

	boxRef.current.children[0].focus();

	setState({ forceFocus: false });
};

export default onForceFocus;


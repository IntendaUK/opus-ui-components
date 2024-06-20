const loadLookupValues = ({ setState, state: { lookupDtaObj, lookupData, options } }) => {
	if (!(lookupDtaObj || lookupData || options))
		return;

	setState({ loadLookupValue: true });
};

export default loadLookupValues;

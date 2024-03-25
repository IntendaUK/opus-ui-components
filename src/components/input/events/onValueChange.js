//External Helpers
import { format, validate } from 'opus-ui';

const onValueChange = props => {
	const { setState, state } = props;
	const { loadLookupValue, validateOnValueChange } = state;

	//We specifically check if loadLookupValue equals true here because we can send flow values into it
	// to force a lookup to be performed. When this happens, we also receive a value meaning that this
	// hook will fire and abandon the lookup loading request.
	if (loadLookupValue === true)
		setState({ loadLookupValue: false });

	format(props);

	if (validateOnValueChange)
		validate(props);
};

export default onValueChange;

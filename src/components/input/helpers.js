import { onBlur,
	onFocus,
	onSelect,
	onKeyDown,
	onInput,
	onWheel } from './events';
import onBeforeChange from './events/onBeforeChange';
import inputTypes from './config';

const getSpecialProps = (props, scrollRef, isNumber) => {
	const { getHandler, state } = props;
	const { enabled, step, readOnly, inputType, allowCharactersRegex, canSelectMultipleFiles } = state;

	const specialProps = {};

	if (isNumber) {
		const handlerOnChange = getHandler(onInput);

		Object.assign(specialProps, {
			step,
			ref: scrollRef,
			onWheel: onWheel.bind(null, props, handlerOnChange)
		});
	}

	if (inputType === 'multiline' || inputType === 'regular')
		specialProps.onInput = getHandler(onInput);

	if (readOnly)
		specialProps.readOnly = true;

	if (canSelectMultipleFiles)
		specialProps.multiple = true;

	if (!enabled)
		specialProps.tabIndex = -1;

	if (allowCharactersRegex)
		specialProps.onBeforeInput = getHandler(onBeforeChange);

	return specialProps;
};

const valueExists = value => {
	return value !== undefined && value !== null;
};

export const buildInputProps = (props, scrollRef, isNumber) => {
	const { getHandler, state } = props;
	const { dataType, placeholder, hasFocus, displayKey } = state;

	let type = inputTypes.number.includes(dataType) ? 'number' : dataType;
	if (type === 'string')
		type = 'text';

	const inputProps = {
		className: 'input',
		type,
		placeholder,
		spellCheck: false,
		autoFocus: hasFocus,
		onBlur: getHandler(onBlur),
		onFocus: getHandler(onFocus),
		onKeyDown: getHandler(onKeyDown),
		onSelect: getHandler(onSelect)
	};

	const value = valueExists(state[displayKey]) ? state[displayKey] : '';

	if (valueExists(value))
		inputProps.value = value;

	const specialProps = getSpecialProps(props, scrollRef, isNumber);
	Object.assign(inputProps, specialProps);

	return inputProps;
};

//External Helpers
import { validate } from '@intenda/opus-ui';

//Helpers
import loadLookupValues from './helpers/loadLookupValues';

//Events
const onInputFile = (
	{ setState, state: { value: oldValue, canSelectMultipleFiles } },
	{ target: { value, files } }
) => {
	if (value !== oldValue) {
		const newState = { value };

		if (canSelectMultipleFiles)
			newState.files = files;
		else
			newState.file = files[0];

		setState(newState);
	}
};

export const onInput = (props, e) => {
	const { setState, state: { value: oldValue, dataType, forceCase } } = props;
	const { target } = e;

	let value = target.value;

	if (dataType === 'file') {
		onInputFile(props, e);

		return;
	}

	if (forceCase) {
		let newValue = value;

		if (forceCase === 'upper')
			newValue = value.toUpperCase();
		else if (forceCase === 'lower')
			newValue = value.toLowerCase();

		if (value !== newValue) {
			value = newValue;
			target.value = value;
		}
	}

	if (target.validity?.valid === false && target.value === '') {
		value = oldValue;
		target.value = oldValue;

		return;
	}

	if (value !== oldValue)
		setState({ value });
};

export const onFormattedInputChange = ({ setState }, { value }) => {
	setState({ value });
};

export const onMaskedInputChange = ({ setState }, event) => {
	event.persist();

	const value = event.target.value || '';
	setState({ value });
};

export const onFocus = ({ setState, emit }, e) => {
	setState({ hasFocus: true });

	emit('onFocus', e);
};

export const onBlur = (props, e) => {
	const { setState, emit, state: { handlerOnBlur, value, loadLookupValueOnBlur } } = props;

	setState({ hasFocus: false });
	emit('onBlur', e);
	validate(props);

	if (loadLookupValueOnBlur)
		loadLookupValues(props);

	if (handlerOnBlur)
		handlerOnBlur(value);
};

export const onSelect = (props, e) => {
	const { emit } = props;

	emit('onSelect', e);
};

const numericDataTypes = ['integer', 'decimal'];
const allowedNaNs = ['-', '.'];

/* eslint-disable-next-line max-lines-per-function, complexity */
export const onKeyDown = ({ setState, emit, state: { value, multiline, dataType } }, e) => {
	const { key } = e;

	const keyIsValid = (
		!numericDataTypes.includes(dataType) ||
		key.length > 1 ||
		e.ctrlKey ||
		e.altKey ||
		(
			key !== ' ' &&
			(
				key !== '-' ||
				!value.includes('-')
			) &&
			(
				key !== '.' ||
				(
					dataType === 'decimal' &&
					!value.includes('.')
				)
			) &&
			(
				!isNaN(key) ||
				allowedNaNs.includes(key)
			)
		)
	);

	if (!keyIsValid) {
		e.preventDefault();

		return;
	}

	emit('onKeyDown', e);

	if (multiline && e.keyCode === 9) {
		setState({ value: value + '\t' });
		e.preventDefault();
	}
};

export const onClickDropdown = ({ setState, state: { open, triggerOpenLookup } }) => {
	if (!open || triggerOpenLookup)
		return;

	setState({ triggerOpenLookup: true });
};

export const onWheel = (props, baseOnChange, e) => {
	const { state: { value, step, hasFocus, needsFocusToScroll } } = props;

	if (needsFocusToScroll && !hasFocus)
		return;

	let delta = (e.deltaY > 0) ? -1 : 1;
	if (e.ctrlKey)
		delta *= 10;
	else if (e.shiftKey)
		delta *= 100;

	delta *= step;

	const newValue = ~~value + delta;

	baseOnChange({ target: { value: newValue } });
};

export const onWheelPassive = (scrollRef, isNumber) => {
	if (!isNumber || !scrollRef.current.addEventListener)
		return;

	const stopScroll = e => e.preventDefault();

	const scrollEl = scrollRef.current;
	scrollEl.addEventListener('wheel', stopScroll);

	return () => scrollEl.removeEventListener('wheel', stopScroll);
};

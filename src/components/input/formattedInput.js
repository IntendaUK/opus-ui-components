//React
import React, { useEffect, useContext, useRef } from 'react';

//System
import { createContext } from '@intenda/opus-ui';

//Events
import { buildInputProps } from './helpers';

//Helpers
import { onFormattedInputChange, onWheelPassive } from './events';
import inputTypes from './config';

//Plugins
import { NumericFormat } from 'react-number-format';

const InputContext = createContext('input');

export const FormattedInput = () => {
	const props = useContext(InputContext);
	const { getHandler, state } = props;
	const { dataType, prefix, suffix, thousandSeparator, decimalSeparator, decimalScale } = state;

	const isNumber = inputTypes.number.includes(dataType);

	const scrollRef = useRef();
	const onGetInputRef = el => {
		scrollRef.current = el;
	};

	const inputProps = buildInputProps(props, scrollRef, isNumber);
	const onChangeHandler = getHandler(onFormattedInputChange);

	useEffect(onWheelPassive.bind(null, scrollRef, isNumber), [scrollRef.current]);

	return (
		<NumericFormat
			{...inputProps}
			getInputRef={onGetInputRef}
			prefix={prefix}
			suffix={suffix}
			decimalScale={decimalScale}
			thousandSeparator={thousandSeparator}
			decimalSeparator={decimalSeparator}
			isNumericString={true}
			onValueChange={onChangeHandler}
			type='text'
		/>
	);
};

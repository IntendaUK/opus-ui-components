//React
import React, { useContext } from 'react';

//System
import { createContext } from 'opus-ui';

//Events
import { onMaskedInputChange } from './events';

//Helpers
import { buildInputProps } from './helpers';

//Plugins
import InputMask from 'react-input-mask';

const InputContext = createContext('input');

export const MaskedInput = () => {
	const props = useContext(InputContext);
	const { getHandler, state: { mask, maskChar, alwaysShowMask } } = props;

	const inputProps = buildInputProps(props);
	const handlerOnChange = getHandler(onMaskedInputChange);

	inputProps.className += ' masked';

	return (
		<InputMask
			{...inputProps}
			mask={mask}
			maskChar={maskChar}
			alwaysShowMask={alwaysShowMask}
			onChange={handlerOnChange}
		/>
	);
};

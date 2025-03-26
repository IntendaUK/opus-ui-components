//React
import React, { useContext } from 'react';

//System
import { createContext } from '@intenda/opus-ui';

//Events
import { onMaskedInputChange } from './events';

//Helpers
import { buildInputProps } from './helpers';

//Plugins
import InputMask from '@mona-health/react-input-mask';

const InputContext = createContext('input');

export const MaskedInput = () => {
	const props = useContext(InputContext);
	const { getHandler, state: { mask, alwaysShowMask, maskPlaceholder } } = props;

	const inputProps = buildInputProps(props);
	const handlerOnChange = getHandler(onMaskedInputChange);

	inputProps.className += ' masked';

	return (
		<InputMask
			{...inputProps}
			mask={mask}
			maskPlaceholder={maskPlaceholder}
			alwaysShowMask={alwaysShowMask}
			onChange={handlerOnChange}
		/>
	);
};

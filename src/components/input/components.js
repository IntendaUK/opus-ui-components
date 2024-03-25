// React
import React, { useEffect, useContext, useRef } from 'react';

// System
import { createContext, PopoverOwnRef } from 'opus-ui';

// Components
import { FormattedInput } from './formattedInput';
import { MaskedInput } from './maskedInput';

//Events
import { onClickDropdown, onWheelPassive } from './events';
import onGetBoxRef from './events/onGetBoxRef';

// Helpers
import { buildInputProps } from './helpers';
import inputTypes from './config';

const InputContext = createContext('input');

const MultilineInput = () => {
	const props = useContext(InputContext);
	const inputProps = buildInputProps(props);

	return <textarea {...inputProps} />;
};

const RegularInput = () => {
	const props = useContext(InputContext);

	const { state: { dataType } } = props;

	const scrollRef = useRef(null);
	const isNumber = inputTypes.number.includes(dataType);

	useEffect(onWheelPassive.bind(null, scrollRef, isNumber), []);

	const inputProps = buildInputProps(props, scrollRef, isNumber);

	return <input {...inputProps} />;
};

const Input = () => {
	const { state: { inputType: inputComponentType } } = useContext(InputContext);

	if (!inputComponentType)
		return null;

	if (inputComponentType === 'multiline')
		return <MultilineInput />;
	else if (inputComponentType === 'masked')
		return <MaskedInput />;
	else if (inputComponentType === 'formatted')
		return <FormattedInput />;

	return <RegularInput />;
};

const Dropdown = () => {
	const { id, ChildWgt, getHandler, state } = useContext(InputContext);
	const { open, boxRef, prpsDropdownIcon } = state;

	if (!open)
		return null;

	const handlerOnClick = getHandler(onClickDropdown, boxRef);

	return (
		<ChildWgt mda={{
			type: 'icon',
			index: 'dropdownIcon',
			prps: {
				value: 'arrow_drop_down',
				canClick: true,
				handlerOnClick,
				...prpsDropdownIcon
			},
			auth: ['handlerOnClick'],
			id
		}} />
	);
};

export const Box = () => {
	const props = useContext(InputContext);
	const boxRef = useRef(null);

	useEffect(props.getHandler(onGetBoxRef, boxRef), [boxRef]);

	return (
		<div ref={boxRef} className='box'>
			<PopoverOwnRef props={props} ownerRef={boxRef} />
			<Input />
			<Dropdown />
		</div>
	);
};

//React
import React, { useContext } from 'react';

//System
import { createContext, useEffectSkipFirst, Popover, PopoverOwnEvents } from 'opus-ui';

//Styles
import './styles.css';

//Events
import { onClick, onCallHandler } from './events';
import { generateCheckboxIconProps } from './helpers';

//Context
const CheckboxContext = createContext('checkbox');

const RegularCheckbox = () => {
	const props = useContext(CheckboxContext);
	const { id, ChildWgt, getHandler, state: { value } } = props;

	const iconPrps = generateCheckboxIconProps(props);

	const className = `icon${value ? ' checked' : ''}`;
	const handlerOnClick = getHandler(onClick);

	return (
		<div className={className} onClick={handlerOnClick}>
			<Popover props={props} />
			<ChildWgt mda={{
				id,
				index: 'icon',
				type: 'icon',
				prps: iconPrps,
				auth: Object.keys(iconPrps)
			}} />
		</div>
	);
};

const SwitchCheckbox = () => {
	const props = useContext(CheckboxContext);
	const { id, getHandler, state: { value } } = props;

	const inputId = `${id}-switchCheckbox`;

	const handlerOnClick = getHandler(onClick);
	const handlerOnChange = getHandler(onClick);
	const className = `switchContainer${value ? ' checked' : ''}`;

	const events = { onClick: handlerOnClick };

	return (
		<div className={className}>
			<PopoverOwnEvents props={props} ownerEvents={events} />
			<input
				id={inputId}
				type='checkbox'
				className='switchInput'
				checked={!!value}
				onChange={handlerOnChange} />
			<label
				htmlFor={inputId}
				className='switchLabel' />
		</div>
	);
};

//Export
export const Checkbox = props => {
	const { id, classNames, getHandler, style, attributes, state: { value, isSwitch } } = props;

	useEffectSkipFirst(getHandler(onCallHandler), value);

	const CheckboxInner = isSwitch ? SwitchCheckbox : RegularCheckbox;

	return (
		<CheckboxContext.Provider value={props}>
			<div
				id={id}
				style={style}
				className={classNames}
				{...attributes}
			>
				<CheckboxInner />
			</div>
		</CheckboxContext.Provider>

	);
};

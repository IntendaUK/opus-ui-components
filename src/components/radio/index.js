//React
import React, { useContext, useCallback } from 'react';

//System
import { createContext, Popover, generateClassNames } from 'opus-ui';

//Styles
import './styles.css';

//Context
const RadioContext = createContext('radioContext');

//Events
const onClick = ({ setState }, value) => {
	setState({ value });
};

//Components
const RadioIcon = ({ index, value, className }) => {
	const { id, ChildWgt, state: { prpsIcon } } = useContext(RadioContext);

	return <ChildWgt mda={{
		id,
		index,
		type: 'icon',
		prps: {
			className,
			value,
			...prpsIcon
		}
	}} />;
};

const RadioLabel = ({ index, cpt, labelProps }) => {
	const { id, ChildWgt } = useContext(RadioContext);

	return (
		<ChildWgt mda={{
			id,
			index,
			type: 'label',
			prps: {
				...labelProps,
				cpt
			}
		}} />
	);
};

const RadioOption = ({ option, index }) => {
	const { getHandler, state: { value, prpsOptionLabel } } = useContext(RadioContext);

	const optionClasses = generateClassNames('option', { active: value === option });
	const handlerOnClick = useCallback(getHandler(onClick, option), []);

	return (
		<div className={optionClasses} onClick={handlerOnClick}>
			<div className='icons'>
				<RadioIcon
					index={`${index}-outer`}
					value='radio_button_unchecked'
					className='circle'
				/>
				<RadioIcon
					index={`${index}-inner`}
					value='brightness_1'
					className='dot'
				/>
			</div>
			<RadioLabel
				index={`${index}-${option}`}
				cpt={option}
				labelProps={prpsOptionLabel}
			/>
		</div>
	);
};

const RadioCaption = () => {
	const { state: { hasLabel, prpsLabel, cpt } } = useContext(RadioContext);

	if (!hasLabel || !cpt)
		return null;

	return (
		<RadioLabel
			index='radioLabel'
			cpt={cpt}
			labelProps={prpsLabel}
		/>
	);
};

export const Radio = props => {
	const { id, classNames, attributes, state: { options = [] } } = props;

	const radioOptions = options.map((option, i) => (
		<RadioOption
			key={`option_${i}`}
			index={`option_${i}`}
			option={option}
		/>
	));

	return (
		<RadioContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				{...attributes}>
				<Popover props={props} />
				<RadioCaption />
				<div className='options'>
					{radioOptions}
				</div>
			</div>
		</RadioContext.Provider>
	);
};

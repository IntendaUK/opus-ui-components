//React
import React, { useContext } from 'react';

//System
import { createContext } from '@intenda/opus-ui';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

//Context
const TimePickerContext = createContext('timePicker');

//Events
const onSelectValue = ({ setState }, options, setKey, { track: { details } }) => {
	const { rel: currentIndex } = details;

	const newValue = options[currentIndex];

	setState({
		[setKey]: newValue,
		isDragging: false
	});
};

const onClickSlide = ({ state: { isDragging } }, slider, slideIndex) => {
	if (isDragging)
		return;

	slider.current.moveToIdx(slideIndex);
};

const onDragStart = ({ setState }) => {
	setState({ isDragging: true });
};

//Components
const Options = ({ options, slider, setKey }) => {
	const { getHandler } = useContext(TimePickerContext);

	const els = options.map((h, i) => {
		const clickHandler = getHandler(onClickSlide, slider, i);

		return (
			<div
				key={`${setKey}_${h}`}
				className='option keen-slider__slide'
				onClick={clickHandler}
			>
				{h}
			</div>
		);
	});

	return els;
};

const Picker = ({ options, setKey, value, prpsSlider, heading }) => {
	const { getHandler } = useContext(TimePickerContext);

	let initial = options.indexOf(value);
	if (initial === -1)
		initial = 0;

	const afterChange = getHandler(onSelectValue, options, setKey);
	const dragStart = getHandler(onDragStart);

	const [sliderRef, slider] = useKeenSlider({
		...prpsSlider,
		initial,
		animationEnded: afterChange,
		slideChanged: dragStart
	});

	return (
		<div className={`column ${setKey}`}>
			<div className='heading'>{heading}</div>
			<div className='picker' ref={sliderRef}>
				<Options
					options={options}
					slider={slider}
					setKey={setKey}
				/>
			</div>
		</div>
	);
};

//Exports
export default Picker;

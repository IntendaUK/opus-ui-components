//React
import React, { useContext } from 'react';

//System
import { createContext } from 'opus-ui';

//External Helpers
import { Popover } from 'opus-ui';

//Styles
import './styles.css';

//Context
const ImageContext = createContext('imageContext');

const InnerImage = () => {
	const { state } = useContext(ImageContext);
	const { value, alt, tooltip, imageWidth, imageHeight } = state;

	return (
		<img
			src={value}
			alt={alt}
			title={tooltip}
			width={imageWidth}
			height={imageHeight}
		/>
	);
};

//Components
export const Image = props => {
	const { id, classNames, style, attributes } = props;

	return (
		<ImageContext.Provider value={props}>
			<div
				id={id}
				className={classNames}
				style={style}
				{...attributes}
			>
				<Popover props={props} />
				<InnerImage />
			</div>
		</ImageContext.Provider>
	);
};

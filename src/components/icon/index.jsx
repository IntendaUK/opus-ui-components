//React
import React, { useContext } from 'react';

//System
import { createContext, PopoverOwnEvents } from '@intenda/opus-ui';

//Styles
import './styles.css';
import 'material-symbols';

const IconContext = createContext('iconContext');

//Internal
const iconClassNameMap = {
	outlined: 'material-symbols-outlined',
	rounded: 'material-symbols-rounded',
	sharp: 'material-symbols-sharp',
	twoTone: 'material-symbols-two-tone'
};

//Components
const Badge = () => {
	const { id, ChildWgt, state: { hasBadge, badgeValue } } = useContext(IconContext);

	if (!hasBadge)
		return null;

	return <ChildWgt mda={{
		id,
		type: 'badge',
		index: 'badge',
		prps: { badgeValue }
	}} />;
};

export const Icon = props => {
	const { id, style, attributes, classNames: classNamesBase, state } = props;
	const { value, handlerOnClick, title, iconStyle } = state;

	const iconClassName = iconClassNameMap[iconStyle] ?? 'material-symbols-outlined';

	const spanStyle = {};
	if (iconStyle === 'filled')
		iconClassName += ' filled';

	return (
		<IconContext.Provider value={props}>
			<div
				id={id}
				className={classNamesBase}
				style={style}
				{...attributes}
				title={title}
				onClick={handlerOnClick}
			>
				<PopoverOwnEvents
					props={props}
					ownerEvents={handlerOnClick ? { onClick: handlerOnClick } : {}}
				/>

				<span className={iconClassName}>
					{value}
				</span>

				<Badge />
			</div>
		</IconContext.Provider>
	);
};


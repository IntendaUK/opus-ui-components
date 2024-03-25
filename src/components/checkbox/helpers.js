//External helpers
import { clone } from 'opus-ui';

const defaultIconMappings = {
	true: 'check_box',
	false: 'check_box_outline_blank',
	null: 'indeterminate_check_box'
};

export const generateCheckboxIconProps = props => {
	const { state } = props;
	const { value, prpsIcon, prpsIconChecked, prpsIconUnchecked, prpsIconIndeterminate } = state;

	const defaultIcon = defaultIconMappings[value];

	const defaultPrps = {
		value: defaultIcon,
		className: 'icon'
	};

	let assignPrps;
	if (value === true)
		assignPrps = prpsIconChecked;
	else if (value === false)
		assignPrps = prpsIconUnchecked;
	else if (value === null)
		assignPrps = prpsIconIndeterminate;

	const iconPrps = clone(defaultPrps, prpsIcon, assignPrps);

	return iconPrps;
};

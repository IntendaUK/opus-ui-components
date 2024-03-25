/* eslint-disable max-len */

//CSS Map Functions
import { mapToColor } from 'opus-ui';

//Props
const props = {
	vertical: {
		type: 'boolean',
		desc: 'When true, the slider will be vertically positioned',
		dft: false
	},
	min: {
		type: 'number',
		desc: 'A number defining the minimum value for the slider',
		dft: 0
	},
	max: {
		type: 'number',
		desc: 'A number defining the maximum value for the slider',
		dft: 100
	},
	value: {
		type: 'string',
		desc: 'The current value of the slider'
	},
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the slider will have a label'
	},
	handlerOnChange: {
		type: 'function',
		desc: 'A handler function to be executed on value change'
	},
	isDiscrete: {
		type: 'boolean',
		desc: 'When true, the slider will render with discrete values',
		dft: false
	},
	interval: {
		type: 'integer',
		desc: 'A number defining the value to be added or subtracted on each step the slider makes',
		dft: 1
	},
	hasTooltip: {
		type: 'boolean',
		desc: 'When true, a tooltip will be shown when dragging the handle',
		dft: false
	},
	tooltipPosition: {
		type: 'string',
		desc: 'A string that defines the position of the tooltip',
		options: ['top', 'bottom'],
		dft: ({ hasTooltip }) => {
			if (hasTooltip)
				return 'top';
		}
	},
	colorRail: {
		type: 'string',
		desc: 'A string that defines the color of the slider rail',
		cssVar: 'color-rail',
		cssVarVal: mapToColor
	},
	colorHandle: {
		type: 'string',
		desc: 'A string that defines the color of the slider handle',
		cssVar: 'color-handle',
		cssVarVal: mapToColor
	},
	colorTrack: {
		type: 'string',
		desc: 'A string that defines the color of the slider track',
		cssVar: 'color-track',
		cssVarVal: mapToColor
	}
};

export default props;

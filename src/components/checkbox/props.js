/* eslint-disable max-len */

//CSS Map Functions
import { mapToColor } from 'opus-ui';

//Props
const props = {
	value: {
		type: 'boolean',
		desc: 'The value of the checkbox',
		dft: ({ triState }) => {
			return triState ? null : false;
		}
	},
	triState: {
		type: 'boolean',
		desc: 'When true, the checkbox will have a triState indicator (see https://en.wiktionary.org/wiki/tristate)',
		dft: false
	},
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the checkbox will have a label',
		dft: true
	},
	checkboxFirst: {
		type: 'boolean',
		desc: 'When true, the checkbox will be displayed first, followed by the label',
		dft: false,
		classMap: 'checkboxFirst'
	},
	isSwitch: {
		type: 'boolean',
		desc: 'When true, the checkbox will be styled as a switch',
		dft: false
	},
	handlerOnChange: {
		type: 'function',
		desc: 'A handler function to be executed when the checkbox is clicked'
	},
	switchTrackAlpha: {
		type: 'decimal',
		desc: 'A decimal number which sets the alpha of the switch track',
		cssVar: 'switch-track-alpha',
		cssVarVal: true
	},
	switchTrackColorOff: {
		type: 'string',
		desc: 'A string which defines the color of the switch track when the switch is off',
		spec: 'A color theme key like "primary"',
		cssVar: 'switch-track-color-off',
		cssVarVal: v => `var(--colors-${v}-rgb)`
	},
	switchTrackColorOn: {
		type: 'string',
		desc: 'A string which defines the color of the switch track when the switch is on',
		spec: 'A color theme key like "primary"',
		cssVar: 'switch-track-color-on',
		cssVarVal: v => `var(--colors-${v}-rgb)`
	},
	switchHandleColorOff: {
		type: 'string',
		desc: 'A string which defines the color of the switch handle when the switch is off',
		cssVar: 'switch-handle-color-off',
		cssVarVal: mapToColor
	},
	switchHandleColorOn: {
		type: 'string',
		desc: 'A string which defines the color of the switch handle when the switch is on',
		cssVar: 'switch-handle-color-on',
		cssVarVal: mapToColor
	},
	switchHandleShadow: {
		type: 'boolean',
		desc: 'When true, a shadow will be applied to the switch handle',
		classMap: 'handleHasShadow',
		dft: true
	},
	switchTrackBorderStyle: {
		type: 'string',
		desc: 'Defines the width (in px), color and style of the track\'s border',
		cssVar: 'switch-track-border-style',
		cssVarVal: true
	},
	switchHandleBorderStyle: {
		type: 'string',
		desc: 'Defines the width (in px), color and style of the handle\'s border',
		cssVar: 'switch-handle-border-style',
		cssVarVal: true
	},
	autoPad: {
		type: 'boolean',
		classMap: true,
		desc: 'When cpt is set and autopad is true, the caption will be automatically aligned with the checkbox',
		dft: ({ cpt }) => {
			if (cpt)
				return true;
		}
	},
	prpsIcon: {
		type: 'object',
		desc: 'Default prps that are used by the checkbox icon',
		dft: () => ({})
	},
	prpsIconChecked: {
		type: 'object',
		desc: 'Prps that are used by the checkbox icon when the icon is checked',
		dft: () => ({})
	},
	prpsIconUnchecked: {
		type: 'object',
		desc: 'Prps that are used by the checkbox icon when the icon is unchecked',
		dft: () => ({})
	},
	prpsIconIndeterminate: {
		type: 'object',
		desc: 'Prps that are used by the checkbox icon when the icon is indeterminate',
		dft: () => ({})
	},
	readOnly: {
		type: 'boolean',
		desc: 'When true, the value of the field can not be changed by clicking on it'
	}
};

export default props;


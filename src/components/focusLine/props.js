//CSS Map Functions
import { mapToColor, mapToSize } from 'opus-ui';

//Props
const props = {
	active: {
		type: 'boolean',
		desc: 'When true, the focus line will become visible',
		classMap: true
	},
	height: {
		type: 'string',
		desc: 'The height of the component.',
		cssAttr: true,
		cssAttrVal: mapToSize,
		dft: '2px'
	},
	backgroundColor: {
		type: 'string',
		desc: 'The background color of the focusLine',
		cssAttr: undefined,
		cssAttrVal: undefined,
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'primary'
	},
	animationDuration: {
		type: 'string',
		desc: 'The duration of the focus active/inactive transition',
		spec: 'Please refer to: https://www.w3schools.com/cssref/css3_pr_transition-duration.asp',
		cssVar: true,
		cssVarVal: true,
		dft: '0.35s'
	},
	animationTimingFunction: {
		type: 'string',
		desc: 'The timing function of the focus active/inactive transition',
		spec: 'Please refer to: https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp',
		cssVar: true,
		cssVarVal: true,
		dft: 'cubic-bezier(0.64, 0.09, 0.08, 1)'
	}
};

export default props;

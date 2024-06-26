/*eslint-disable max-len*/

//CSS Map Functions
import { mapToColor } from '@intenda/opus-ui';

//Props
const props = {
	value: {
		type: 'decimal',
		desc: 'A value to be displayed that, when passed, will set the progress bar as determinate, and progress will be indicated',
		classMap: 'determinate',
		cssVar: 'bar-width',
		cssVarVal: v => `${v}%`
	},
	colorBar: {
		type: 'string',
		desc: 'The background color of the progress indicator bar',
		cssVar: true,
		cssVarVal: mapToColor
	}
};

export default props;

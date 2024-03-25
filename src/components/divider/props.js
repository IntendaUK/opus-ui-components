//CSS Map Functions
import { mapToColor, mapToSize } from '@intenda/opus-ui';

//Props
const props = {
	color: {
		type: 'string',
		desc: 'A string defining the color of the divider',
		dft: 'divider',
		cssAttr: 'backgroundColor',
		cssAttrVal: mapToColor
	},
	thickness: {
		type: 'string',
		desc: 'A string defining the height of the divider',
		dft: 'dividerThickness',
		cssAttr: 'height',
		cssAttrVal: mapToSize
	}
};

export default props;

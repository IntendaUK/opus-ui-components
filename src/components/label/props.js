//cssMaps
import { mapToColor } from '@intenda/opus-ui';

//Props
const props = {
	cpt: {
		type: 'string',
		desc: 'The caption of the label'
	},
	subType: {
		type: 'string',
		desc: 'A string of classnames to be added based on mapping provided in classMaps',
		classMap: v => v
	},
	bold: {
		type: 'boolean',
		desc: 'When true, the label will be bold',
		cssAttr: 'fontWeight',
		cssAttrVal: v => {
			if (v)
				return 'bold';
		}
	},
	underline: {
		type: 'boolean',
		desc: 'When true, the label will have an underline',
		cssAttr: 'textDecoration',
		cssAttrVal: v => {
			if (v)
				return 'underline';
		}
	},
	italic: {
		type: 'boolean',
		desc: 'When true the label will be italic',
		cssAttr: 'fontStyle',
		cssAttrVal: v => {
			if (v)
				return 'italic';
		}
	},
	uppercase: {
		type: 'boolean',
		desc: 'When true the label will be uppercase',
		classMap: true
	},
	lowercase: {
		type: 'boolean',
		desc: 'When true the label will be lowercase',
		classMap: true
	},
	capitalize: {
		type: 'boolean',
		desc: 'When true the label will be capitalized',
		classMap: true
	},
	hyperlink: {
		type: 'boolean',
		desc: 'When true, the label will be a clickable hyperlink',
		cssAttr: 'cursor',
		cssAttrVal: v => {
			if (v)
				return 'pointer';
		}
	},
	labelType: {
		type: 'string',
		desc: 'The type of the label',
		options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		classMap: v => v
	},
	color: {
		type: 'string',
		desc: 'Defines the named themed colour that the label text should be rendered in',
		dft: 'text',
		cssAttr: true,
		cssAttrVal: mapToColor
	},
	justify: {
		type: 'string',
		desc: 'Sets the alignment of the text inside the label',
		options: ['left', 'right', 'center', 'stretch'],
		dft: 'start',
		cssAttr: 'textAlign',
		cssAttrVal: v => v === 'stretch' ? 'justify' : v
	}
};

export default props;


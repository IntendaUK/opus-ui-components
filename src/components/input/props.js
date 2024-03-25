/* eslint-disable max-lines, max-len */

//CSS Map Functions
import { mapToColor, mapToSize } from 'opus-ui';

//Config
import inputTypes from './config';

//Props
import internalProps from './internalProps';

const props = {
	value: {
		type: 'mixed',
		desc: 'The value of the input',
		dft: ''
	},
	dataType: {
		type: 'string',
		desc: 'A HTML input or Textarea component\'s data type',
		classMap: val => `type-${val}`
	},
	canSelectMultipleFiles: {
		type: 'boolean',
		desc: 'When the dataType is set to "file" and this property is set to true, multiple files can be selected'
	},
	multiline: {
		type: 'boolean',
		desc: 'When true, the input can have multiple lines',
		dft: false,
		classMap: true
	},
	placeholder: {
		type: 'string',
		desc: 'A string defining the input\'s placeholder'
	},
	open: {
		type: 'string',
		desc: 'A string that tells the system which popup should be opened when the input is clicked on'
	},
	hlp: {
		type: 'object',
		desc: 'A helper string that is shown beneath the input',
		classMap: val => {
			if (val)
				return 'hasHelp';

			return null;
		}
	},
	hasLabel: {
		type: 'boolean',
		desc: 'When true, the input will have a label',
		dft: true
	},
	mask: {
		type: 'string',
		desc: 'The string spec for which masks each character of the input\'s value as defined by the mask char',
		spec: '9999, aaa, ***-**-***, 99-a-***'
	},
	maskChar: {
		type: 'string',
		desc: 'Applies masking rules for each character for the input\'s value. If a "9" is supplied, only numbers in the range: [0-9] can be entered (for that specific character). If an "a" is supplied, only characters in the range: [a-z / A-Z] can be entered. If a "*" is supplied, anything can be entered',
		dft: ({ mask = undefined }) => {
			if (mask !== undefined)
				return '*';
		}
	},
	alwaysShowMask: {
		type: 'boolean',
		desc: 'If true, the mask character will always be shown, even when completed',
		dft: ({ mask = undefined }) => {
			if (mask !== undefined)
				return false;
		}
	},
	enforceValidators: {
		type: 'boolean',
		desc: 'If true, inputs will not enforce validation rules',
		dft: false
	},
	thousandSeparator: {
		type: 'string',
		desc: 'Thousand Separator',
		dft: ({ dataType }) => {
			if (inputTypes.number.includes(dataType))
				return ',';
		}
	},
	decimalSeparator: {
		type: 'string',
		desc: 'Decimal Separator',
		dft: ({ dataType }) => {
			if (dataType === 'decimal')
				return '.';
		}
	},
	prefix: {
		type: 'string',
		desc: 'Input value prefix'
	},
	suffix: {
		type: 'string',
		desc: 'Input value suffix'
	},
	scale: {
		type: 'number',
		desc: 'How many decimal digits should be displayed for the number',
		dft: ({ dataType }) => {
			if (dataType === 'decimal')
				return 2;
		}
	},
	decimalScale: {
		type: 'number',
		desc: 'How many decimal digits should be displayed for the number'
	},
	hasFocus: {
		type: 'boolean',
		desc: 'When true, the input has focus',
		classMap: 'focus',
		internal: true
	},
	lookup: {
		type: 'object',
		desc: 'The name of the dashboard that should open when clicking on a lookup input. Should not be used in conjunction with lookupDtaObj or lookupData',
		classMap: true
	},
	autoDropdown: {
		type: 'boolean',
		desc: 'When true, it\'s possible to click anywhere on the input to trigger a lookup to open instead of needing to click on the dropdown arrow',
		classMap: true
	},
	displayKey: {
		type: 'string',
		desc: 'Tells the component which key from the state should be rendered inside the input field',
		dft: 'value'
	},
	readOnly: {
		type: 'boolean',
		desc: 'When true, the field can not be focused or typed into',
		dft: ({ displayKey }) => {
			if (displayKey !== 'value')
				return true;
		}
	},
	guid: {
		type: 'boolean',
		desc: 'When true, the input\'s value will be a guid'
	},
	handlerOnChange: {
		type: 'function',
		desc: 'A handler function to be executed when the input\'s value changes'
	},
	handlerOnBlur: {
		type: 'function',
		desc: 'A handler function to be executed when the input loses focus'
	},
	updateTheme: {
		type: 'object',
		desc: 'When set, allows the input to update a theme variable when changed',
		spec: {
			theme: 'string',
			key: 'string'
		}
	},
	lookupDtaObj: {
		type: 'string',
		desc: 'A string specifying the path to the lookup data'
	},
	lookupData: {
		type: 'array',
		desc: 'The data for the lookup'
	},
	lookupFlows: {
		type: 'array',
		desc: 'A list of flows that should be applied to the lookup'
	},
	lookupFilters: {
		type: 'array',
		desc: 'A list filters that should be applied to the lookup'
	},
	lookupAutoFilters: {
		type: 'array',
		desc: 'A list of filters to be applied when doing an auto lookup (on blur lookup)'
	},
	lookupMda: {
		type: 'object',
		desc: 'A custom mda object that is used to wrap the lookup grid'
	},
	lookupPrps: {
		type: 'object',
		desc: 'Extra lookup props'
	},
	lookupWgts: {
		type: 'array',
		desc: 'Wgts for the lookup'
	},
	lookupPassthroughPrps: {
		type: 'array',
		desc: 'A list of properties on the input that should be sent to the lookup component when it opens'
	},
	lookupStyleOverrides: {
		type: 'object',
		desc: 'An object containing styles to apply to the popup grid\'s container div'
	},
	lookupAnchorId: {
		type: 'string',
		desc: 'When set, lookups that open as popups will appear under the element with this id instead of under the input itself'
	},
	loadLookupValueOnBlur: {
		type: 'boolean',
		desc: 'When set to true, the lookup will be opened (internally) and a value loaded if possible',
		dft: false
	},
	triggerOpenLookup: {
		type: 'boolean',
		desc: 'Used internally when clicking on a lookup (causes the lookup to open) but can also be used externally to cause the lookup to open on demand'
	},
	hasBottomBorder: {
		type: 'boolean',
		desc: 'When true, a bottom border will be shown below the input',
		classMap: true
	},
	padding: {
		type: 'boolean',
		desc: 'When true, the input will have default padding',
		cssAttr: true,
		cssAttrVal: v => {
			if (v)
				return '10px 0px 6px 0px';
		}
	},
	color: {
		type: 'string',
		desc: 'A string that specifies the color of the input text',
		dft: 'primary',
		cssVar: 'text-color',
		cssVarVal: mapToColor
	},
	colorPlaceholder: {
		type: 'string',
		desc: 'A string that specifies the color of the placeholder text',
		dft: 'primary',
		cssVar: 'placeholder-text-color',
		cssVarVal: mapToColor
	},
	errorOverrides: {
		type: 'string',
		desc: 'A object that expects validation keys and associated messages that will override the default error message given by validators',
		spec: {
			mandatory: 'This field is required',
			regex: 'This field contains special characters.'
		},
		dft: () => ({})
	},
	validateOnValueChange: {
		type: 'boolean',
		desc: 'When true, validation will be performed every time the input\'s value is changed, instead of when the input loses focus',
		dft: false
	},
	hasDropdownArrow: {
		type: 'boolean',
		classMap: true,
		desc: 'When true, the input will show a dropdown arrow',
		dft: ({ open }) => {
			if (open)
				return true;
		}
	},
	autoPad: {
		type: 'boolean',
		classMap: true,
		desc: 'When cpt is set and autopad is true, the caption will be automatically aligned with the input',
		dft: ({ cpt }) => {
			if (cpt)
				return true;
		}
	},
	prpsDropdownIcon: {
		type: 'object',
		desc: 'Properties which are passed to the input dropdown\'s icon'
	},
	forceFocus: {
		type: 'boolean',
		desc: 'When set to true, the input will be focussed'
	},
	hideNumberArrows: {
		type: 'boolean',
		desc: 'When set to true, the \'increment and decrement\' arrows will not be visible',
		classMap: true
	},
	allowCharactersRegex: {
		type: 'string',
		desc: 'A regular expression of which characters should be allowed in the input field. Read more at: https://www.w3schools.com/tags/att_input_pattern.asp'
	},
	forceCase: {
		type: 'string',
		desc: 'When set, forces characters to be converted to either uppercase or lowercase',
		options: ['upper', 'lower']
	},
	needsFocusToScroll: {
		type: 'boolean',
		desc: 'When true, users will not be able to scroll on numeric inputs that aren\'t focused.',
		dft: true
	},
	//Overrides for baseProps
	height: {
		type: 'number',
		desc: 'The height of the input component',
		cssAttr: false,
		cssAttrVal: false,
		cssVar: true,
		cssVarVal: mapToSize,
		dft: ({ multiline }) => {
			if (!multiline)
				return 'padding';

			return 'calc(var(--global-giantPadding) * 2 - 20px)';
		}
	},
	textAlign: {
		cssAttr: false,
		cssAttrVal: false,
		cssVar: true,
		cssVarVal: true
	},
	fontFamily: {
		type: 'string',
		desc: 'A string defining the font family of the component',
		cssAttr: false,
		cssAttrVal: false,
		cssVar: true,
		cssVarVal: true,
		dft: 'inherit'
	},
	fontSize: {
		type: 'string',
		desc: 'A string defining the font size of the component',
		cssAttr: false,
		cssAttrVal: false,
		cssVar: true,
		cssVarVal: mapToSize,
		dft: 'inherit'
	}
};

export default Object.assign(props, internalProps);

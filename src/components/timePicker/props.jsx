/* eslint-disable max-len, max-lines */

//CSS Map Functions
import { mapToColor, mapToSize } from '@intenda/opus-ui';

//Props
const props = {
	value: {
		type: 'string',
		desc: 'The time string',
		spec: 'HH:MM',
		dft: () => {
			const now = new Date();

			const result = [
				(now.getHours() + '').padStart(2, '0'),
				':',
				(now.getMinutes() + '').padStart(2, '0')
			].join('');

			return result;
		}
	},
	valueWithAmPm: {
		type: 'string',
		desc: 'The time string with the AM/PM suffix',
		internal: true
	},
	hours: {
		type: 'integer',
		desc: 'The hour portion of the time'
	},
	minutes: {
		type: 'integer',
		desc: 'The minute portion of the time'
	},
	amPm: {
		type: 'string',
		desc: 'Indicates whether the time is AM or PM',
		options: ['AM', 'PM'],
		dft: 'AM'
	},
	intervalHours: {
		type: 'integer',
		desc: 'Defines the interval between hour options in the picker. Only used when hourOptions is not set',
		dft: 1
	},
	intervalMinutes: {
		type: 'integer',
		desc: 'Defines the interval between minute options in the picker. Only used when minuteOptions is not set',
		dft: 1
	},
	twentyFourHours: {
		type: 'boolean',
		desc: 'When true, the time will be displayed in a 24 hour format',
		dft: false
	},
	active: {
		type: 'boolean',
		desc: 'When true, the time picker popup will be displayed',
		dft: false
	},
	showAmPm: {
		type: 'boolean',
		desc: 'When true, AM/PM will be displayed after the time value',
		dft: false
	},
	isDragging: {
		type: 'boolean',
		desc: 'Set to true internally while the user is busy dragging a picker',
		dft: false,
		internal: true
	},
	popoverZIndex: {
		type: 'integer',
		desc: 'When time pickers are rendered inside containers with higher zIndices, this needs to be set to one (or more) higher than the containing container\'s zindex'
	},

	prpsHourSlider: {
		type: 'object',
		desc: 'Properties sent to the keen-slider plugin to render the pickers',
		spec: 'Please refer to: https://keen-slider.io/api/#api',
		dft: {
			vertical: true,
			slides: {
				origin: 'center',
				perView: 5
			},
			loop: true,
			rubberband: false
		}
	},

	prpsMinuteSlider: {
		type: 'object',
		desc: 'Properties sent to the keen-slider plugin to render the pickers',
		spec: 'Please refer to: https://keen-slider.io/api/#api',
		dft: {
			vertical: true,
			slides: {
				origin: 'center',
				perView: 5
			},
			loop: true,
			rubberband: false
		}
	},

	hourOptions: {
		type: 'array',
		desc: 'The hour options that should be available in the hour picker',
		spec: [1, 2, 3],
		dft: ({ intervalHours, twentyFourHours }) => {
			const max = twentyFourHours ? 24 : 12;

			const entries = ~~(max / intervalHours);
			const hourOptions = '0'
				.repeat(entries)
				.split('')
				.map((n, i) => i * intervalHours);

			return hourOptions;
		}
	},

	minuteOptions: {
		type: 'string',
		desc: 'The minute options that should be available in the minute picker',
		spec: [1, 2, 3],
		dft: ({ intervalMinutes }) => {
			const entries = ~~(60 / intervalMinutes);
			const minuteOptions = '0'
				.repeat(entries)
				.split('')
				.map((n, i) => i * intervalMinutes);

			return minuteOptions;
		}
	},

	//Sub Component Props
	prpsInput: {
		type: 'object',
		desc: 'Override properties for the input that\'s rendered',
		dft: () => {
			return {};
		}
	},

	//Styling
	valueColor: {
		type: 'string',
		desc: 'The color of the value',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'textPrimary'
	},

	valueColorHover: {
		type: 'string',
		desc: 'The color of the value when the user hovers over it',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	valueColorActive: {
		type: 'string',
		desc: 'The color of the value when the picker is active',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	backgroundColorHover: {
		type: 'string',
		desc: 'The background color of the value when the user hovers on it',
		spec: 'A color theme key like "primary"',
		cssVar: true,
		cssVarVal: v => `var(--colors-${v}-rgb)`,
		dft: 'primary'
	},

	backgroundOpacityHover: {
		type: 'decimal',
		desc: 'The opacity of the value\'s background color when the user hovers over it',
		cssVar: true,
		cssVarVal: true,
		dft: 0.35
	},

	backgroundColorActive: {
		type: 'string',
		desc: 'The background color of the value when the picker is active',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'primary'
	},

	popupBackgroundColor: {
		type: 'string',
		desc: 'The background color of the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'primary'
	},

	popupBackgroundColorRgb: {
		type: 'string',
		desc: 'The RGB value of the background color of the picker popup. This is needed for the \'faded\' look on the options inside',
		spec: 'r, g, b',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: ({ popupBackgroundColor = 'primary' }) => `var(--colors-${popupBackgroundColor}-rgb)`,
		internal: true
	},

	popupHeadingColor: {
		type: 'string',
		desc: 'The color of the headings in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	popupOptionColor: {
		type: 'string',
		desc: 'The color of the options\' text in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	popupAmPmColor: {
		type: 'string',
		desc: 'The color of the text in the AM/PM buttons',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	popupAmPmColorHover: {
		type: 'string',
		desc: 'The color of the text in the AM/PM buttons when the user hovers on it',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	popupAmPmColorActive: {
		type: 'string',
		desc: 'The color of the text in the AM/PM buttons when they are selected',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'primary'
	},

	popupAmPmBackgroundColorHover: {
		type: 'string',
		desc: 'The background color of the AM/PM buttons when the user hovers on them',
		spec: 'A color theme key like "primary"',
		cssVar: true,
		cssVarVal: v => `var(--colors-${v}-rgb)`,
		dft: 'iconPrimary'
	},

	popupAmPmBackgroundColorHoverOpacity: {
		type: 'decimal',
		desc: 'The opacity of the background color of the AM/PM buttons when the user hovers on them',
		cssVar: true,
		cssVarVal: true,
		dft: 0.2
	},

	popupAmPmBackgroundColorActive: {
		type: 'string',
		desc: 'The background color of the AM/PM buttons when they are selected',
		cssVar: true,
		cssVarVal: mapToColor,
		dft: 'iconPrimary'
	},

	popupHeight: {
		type: 'string',
		desc: 'The height, in px of the popup container',
		spec: '200px',
		cssVar: true,
		cssVarVal: mapToSize,
		dft: '200px'
	}
};

export default props;

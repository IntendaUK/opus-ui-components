/* eslint-disable max-len, max-lines */

//CSS Map Functions
import { mapToColor, mapToSize } from '@intenda/opus-ui';

//Props
const props = {
	value: {
		type: 'string',
		desc: 'The date string from which the date object should be created. See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date',
		spec: 'YYYY-MM-DD HH:mm:ss',
		dft: () => {
			const dateObject = new Date();
			dateObject.setHours(0, 0, 0, 0);

			const result = dateObject.toString();

			return result;
		}
	},
	valueOverride: {
		type: 'string',
		desc: 'Because the datePicker (internally) syncs the value to the year/month/day combination, we can\'t set the date normally (setState/flow). Because of this, we have this property which should be used to force a change on the value',
		spec: 'YYYY-MM-DD HH:mm:ss'
	},
	valueFormatted: {
		type: 'string',
		desc: 'The formatted date string'
	},
	format: {
		type: 'string',
		desc: 'The format string to be used. Follows moment.js conventions: https://devhints.io/datetime',
		dft: 'YYYY-MM-DD'
	},
	day: {
		type: 'integer',
		desc: 'The day portion of the date'
	},
	month: {
		type: 'integer',
		desc: 'The month portion of the date'
	},
	monthName: {
		type: 'string',
		desc: 'The name of the selected month',
		internal: true
	},
	year: {
		type: 'integer',
		desc: 'The year portion of the date'
	},
	today: {
		type: 'object',
		desc: 'A JavaScript date object for the current date',
		internal: true,
		dft: () => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			return today;
		}
	},
	active: {
		type: 'boolean',
		desc: 'When true, the date selector popup will be rendered',
		dft: false
	},
	popoverZIndex: {
		type: 'integer',
		desc: 'When date pickers are rendered inside containers with higher zIndices, this needs to be set to one (or more) higher than the containing container\'s zindex'
	},
	selectionRequirements: {
		type: 'array',
		desc: 'An array of applyComparison checks to be performed. Comparisons are all done (each successive one changes the result if the comparison evaluates to true and the final value determines if a specific date can be selected',
		spec: [{
			allow: '(boolean) When the comparison evaluates to true, this will be the result of the evaluation',
			comparison: 'A string containing the comparison operator',
			value: '(optional) The value to check',
			compareValue: '(optional) The value to compare against (where relevant)',
			source: '(optional) The id of the component from which to get the value',
			key: '(optional) The key to read from the source component'
		}],
		dft: () => []
	},

	//Internal props
	dateObject: {
		type: 'object',
		desc: 'A JavaScript date object for the selected date',
		internal: true,
		dft: () => new Date()
	},
	selectedDay: {
		type: 'integer',
		desc: 'The day that\'s currently selected in the date picker popup',
		internal: true
	},
	selectedMonth: {
		type: 'integer',
		desc: 'The month that\'s currently selected in the date picker popup',
		internal: true
	},
	selectedMonthName: {
		type: 'string',
		desc: 'The name of the month that\'s currently selected in the date picker popup',
		internal: true
	},
	daysInSelectedMonth: {
		type: 'string',
		desc: 'The amount of days in the month that\'s currently selected in the date picker popup',
		internal: true
	},
	daysInPreviousMonth: {
		type: 'string',
		desc: 'The amount of days in the previous month to the one that\'s currently selected in the date picker popup. This is a convenience property to make it easier to write scripts to navigate through dates',
		internal: true
	},
	selectedYear: {
		type: 'integer',
		desc: 'The year that\'s currently selected in the date picker popup',
		internal: true
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
		cssVarGroup: 'stylePopup',
		dft: 'primary'
	},

	popupHeadingColor: {
		type: 'string',
		desc: 'The color of the headings in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupMonthYearColor: {
		type: 'string',
		desc: 'The color of the month, year text in the popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupMonthButtonColor: {
		type: 'string',
		desc: 'The color of the text in the next/previous month buttons',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupMonthButtonColorHover: {
		type: 'string',
		desc: 'The color of the text in the next/previous month buttons when the user hovers over it',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupMonthButtonBackgroundColor: {
		type: 'string',
		desc: 'The background color of the next/previous month buttons',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'transparent'
	},

	popupMonthButtonBackgroundColorHover: {
		type: 'string',
		desc: 'The background color of the next/previous month buttons when the user hovers over it',
		spec: 'A color theme key like "primary"',
		cssVar: true,
		cssVarVal: v => `var(--colors-${v}-rgb)`,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupMonthButtonBackgroundColorOpacityHover: {
		type: 'decimal',
		desc: 'The opacity of the next/previous month buttons\' background color when the user hovers over it',
		cssVar: true,
		cssVarVal: true,
		cssVarGroup: 'stylePopup',
		dft: 0.2
	},

	popupDayHeadingColor: {
		type: 'string',
		desc: 'The color of the day column headings in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupDateColor: {
		type: 'string',
		desc: 'The color of the date options in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'mediumGrey'
	},

	popupDateColorHover: {
		type: 'string',
		desc: 'The color of the date option in the picker popup when the user hovers over it',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupDateColorSelected: {
		type: 'string',
		desc: 'The color of the date option in the picker popup when it has been selected',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'primary'
	},

	popupDateBackgroundColor: {
		type: 'string',
		desc: 'The background color of the date options in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'transparent'
	},

	popupDateBackgroundColorHover: {
		type: 'string',
		desc: 'The background color of the date option in the picker popup when the user hovers over it',
		spec: 'A color theme key like "primary"',
		cssVar: true,
		cssVarVal: v => `var(--colors-${v}-rgb)`,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupDateBackgroundColorOpacityHover: {
		type: 'decimal',
		desc: 'The opacity of the background of the date option when the user hovers over it',
		cssVar: true,
		cssVarVal: true,
		cssVarGroup: 'stylePopup',
		dft: 0.2
	},

	popupDateBackgroundColorSelected: {
		type: 'string',
		desc: 'The background color of the date option in the picker popup when it has been selected',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'iconPrimary'
	},

	popupTodayColor: {
		type: 'string',
		desc: 'The color of the current (today) date option in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'primary'
	},

	popupTodayBackgroundColor: {
		type: 'string',
		desc: 'The background color of the current (today) date option in the picker popup',
		cssVar: true,
		cssVarVal: mapToColor,
		cssVarGroup: 'stylePopup',
		dft: 'mediumGrey'
	},

	popupHeight: {
		type: 'string',
		desc: 'The height, in px of the popup container',
		spec: '200px',
		cssVar: true,
		cssVarVal: mapToSize,
		cssVarGroup: 'stylePopup',
		dft: '200px'
	},

	closePopupOnClickSelectedDate: {
		type: 'boolean',
		desc: 'When set to true, closes the date picker popup when clicking on the currently selected date'
	}
};

export default props;

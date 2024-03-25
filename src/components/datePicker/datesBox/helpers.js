//External Helpers
import { applyComparison, morphConfig } from 'opus-ui';

//Helpers
export const canSelectDate = (props, day) => {
	const { state: { selectionRequirements, selectedYear, selectedMonth, today } } = props;

	if (day < 1)
		return false;

	const compareDate = new Date(selectedYear, selectedMonth, day);

	let allow = true;

	selectionRequirements.forEach(r => {
		const morphedConfig = morphConfig(r, {}, props, true);

		Object.entries(morphedConfig).forEach(([k, v]) => {
			const replacer = ({
				'((day))': day,
				'((month))': selectedMonth,
				'((year))': selectedYear,
				'((date))': compareDate,
				'((today))': today
			})[v];

			if (replacer !== undefined)
				morphedConfig[k] = replacer;
		});

		if (morphedConfig.value === undefined)
			morphedConfig.value = compareDate;

		const comparisonResult = applyComparison(morphedConfig);

		if (comparisonResult)
			allow = r.allow;
	});

	return allow;
};

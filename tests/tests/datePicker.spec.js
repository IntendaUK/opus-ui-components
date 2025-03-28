
//System
import { test } from '@playwright/test';

//Helpers
import '../helpers/setup';
import { getRandomString } from '../helpers';
import { testSteps } from '../helpers/awaitLocatorActions';

test('Date Picker', async ({ page }) => {
	await testSteps([
		'type , datePicker , #inputViewportValue',
		'ss , valueOverride , 1985/11/26 , datePicker/w/2',
		'gs , valueFormatted , 1985-11-26 , datePicker/w/2',
		'chooseDatePickerDate , 1986/3/12 , datePicker/w/2'
	]);

	/*await page.waitForFunction(() => {
		const elements = Array.from(document.querySelectorAll('.cpnLabel'));

		return elements.length > 0 && elements.every(el => el.textContent.trim() === '<test>success');
	}, { timeout: 30000 });*/
});

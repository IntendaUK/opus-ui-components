
//System
import { test, expect } from '@playwright/test';

//Helpers
import { openTestPage } from '../helpers/setup';
import { testSteps } from '../helpers/awaitLocatorActions';

test.beforeEach(openTestPage);

test('Date Picker', async () => {
	await testSteps([
		'type , datePicker , #inputViewportValue',
		'ss , valueOverride , 1985/11/26 , datePicker/w/2',
		'gs , valueFormatted , 1985-11-26 , datePicker/w/2',
		'chooseDatePickerDate , 1986/3/12 , datePicker/w/2'
	]);
});

test('Date Picker popup is hidden while its anchor is not displayed', async ({ page }) => {
	await testSteps([
		'type , datePicker , #inputViewportValue',
		'type , hostedDatePicker , #stateSetter-target',
		'type , active , #stateSetter-key',
		'type , true , #stateSetter-value',
		'click , #stateSetter-button'
	]);

	const popup = page.locator('.cpnDatePicker-popup');
	await expect(popup).toBeVisible();

	await testSteps(['click , #hideDatePickerHost']);

	await expect(page.locator('#hostedDatePickerContainer')).toBeHidden();
	await expect(popup).toHaveCount(1);
	await expect(popup).toBeHidden();

	await testSteps(['click , #showDatePickerHost']);

	await expect(popup).toBeVisible();
});

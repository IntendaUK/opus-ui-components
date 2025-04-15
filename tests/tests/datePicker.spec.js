
//System
import { test } from '@playwright/test';

//Helpers
import '../helpers/setup';
import { testSteps } from '../helpers/awaitLocatorActions';

test('Date Picker', async () => {
	await testSteps([
		'type , datePicker , #inputViewportValue',
		'ss , valueOverride , 1985/11/26 , datePicker/w/2',
		'gs , valueFormatted , 1985-11-26 , datePicker/w/2',
		'chooseDatePickerDate , 1986/3/12 , datePicker/w/2'
	]);
});

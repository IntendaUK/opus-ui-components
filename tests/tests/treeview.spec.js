
//System
import { test } from '@playwright/test';

//Helpers
import { init, testSteps } from '../helpers/awaitLocatorActions';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/test.html');
	init({ page });
});

test('Treeview: Simple', async () => {
	await testSteps([
		'type , treeview , #inputViewportValue',
		'click , #r1expander',
		'click , #t1expander',
		'childCountEquals , 2 , [id*="t1-Thingschildren"]',
		'click , #t1expander',
		'childCountEquals , 0 , [id*="t1-Thingschildren"]'
	]);
});

test('Treeview: Custom Expander and Label', async () => {
	await testSteps([
		'type , treeview , #inputViewportValue',
		'click , #r2expander',
		'click , #thingsexpander',
		'childCountEquals , 2 , [id*="things-Thingschildren"]',
		'click , #thingsexpander',
		'childCountEquals , 0 , [id*="things-Thingschildren"]'
	]);
});


//System
import { test } from '@playwright/test';

//Helpers
import '../helpers/setup';
import { testSteps } from '../helpers/awaitLocatorActions';

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

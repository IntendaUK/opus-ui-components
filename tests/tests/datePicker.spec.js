
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
	await testSteps(['type , datePicker , #inputViewportValue']);

	const anchor = page.locator('#hostedDatePicker');
	await anchor.waitFor({ state: 'attached' });

	const popup = page.locator('.cpnDatePicker-popup');
	const toggle = () => anchor.evaluate(el => el.click());
	const anchorHasBox = () => anchor.evaluate(el => el.getClientRects().length > 0);
	const settleFrames = () => page.evaluate(() => new Promise(res =>
		requestAnimationFrame(() => requestAnimationFrame(res))
	));
	const popupOffsetFromAnchor = () => page.evaluate(() => {
		const a = document.getElementById('hostedDatePicker').getBoundingClientRect();
		const p = document.querySelector('.cpnDatePicker-popup').getBoundingClientRect();

		return {
			x: Math.round(p.left + (p.width / 2) - (a.left + (a.width / 2))),
			y: Math.round(p.top - a.bottom)
		};
	});

	await test.step('first open and reopen place the popup under the anchor', async () => {
		await toggle();
		await expect(popup).toBeVisible();
		await expect.poll(popupOffsetFromAnchor).toEqual({ x: 0, y: 0 });

		await toggle();
		await expect(popup).toHaveCount(0);

		await anchor.evaluate(el => {
			Object.assign(el.style, { position: 'fixed', top: '120px', left: '420px' });
		});

		await toggle();
		await expect(popup).toBeVisible();
		await expect.poll(popupOffsetFromAnchor).toEqual({ x: 0, y: 0 });
	});

	await test.step('anchor in the viewport', async () => {
		await expect(popup).toBeVisible();

		await testSteps(['click , #hideDatePickerHost']);

		await expect(page.locator('#hostedDatePickerContainer')).toBeHidden();
		await expect(popup).toHaveCount(1);
		await expect(popup).toBeHidden();

		await testSteps(['click , #showDatePickerHost']);

		await expect(popup).toBeVisible();
	});

	await test.step('anchor already above the viewport', async () => {
		await page.locator('#hostedDatePicker').evaluate(el => {
			Object.assign(el.style, { position: 'fixed', top: '-10px', left: '200px' });
		});
		await settleFrames();
		await expect(popup).toBeVisible();

		await testSteps(['click , #hideDatePickerHost']);

		await expect.poll(anchorHasBox).toBe(false);
		await expect(popup).toHaveCount(1);
		await expect(popup).toBeHidden();

		await testSteps(['click , #showDatePickerHost']);

		await expect.poll(anchorHasBox).toBe(true);
		await expect(popup).toBeVisible();
	});
});

import { expect, test } from '@playwright/test';

import '../helpers/setup';

test.beforeEach(async ({ page }) => {
	await page.locator('#inputViewportValue input').fill('repeater');
});

test('Repeater: horizontal virtualization remains visible and scrollable', async ({ page }) => {
	const frame = page.locator('#horizontalFrame');
	const repeater = page.locator('#horizontalRepeater');

	await expect(repeater).toHaveAttribute('role', 'grid');
	await expect.poll(() => repeater.evaluate(element => element.scrollWidth - element.clientWidth))
		.toBeGreaterThan(0);
	const geometry = await Promise.all([
		frame.evaluate(element => element.getBoundingClientRect().toJSON()),
		repeater.evaluate(element => element.getBoundingClientRect().toJSON())
	]);

	expect(geometry[1].bottom).toBeLessThanOrEqual(geometry[0].bottom);
	expect(geometry[1].height).toBeLessThanOrEqual(geometry[0].height);
	await expect(repeater.getByRole('gridcell', { name: 'Column 16' })).toHaveCount(0);
	await page.mouse.move(geometry[1].left + geometry[1].width / 2, geometry[1].bottom - 8);
	for (let i = 0; i < 8; i++) {
		await page.mouse.wheel(400, 0);
		await page.waitForTimeout(25);
	}
	await expect.poll(() => repeater.evaluate(element =>
		Math.abs(element.scrollWidth - element.clientWidth - element.scrollLeft)
	)).toBeLessThanOrEqual(1);
	await expect(repeater.getByRole('gridcell', { name: 'Column 16' })).toBeVisible();
});

test('Repeater: vertical virtualization remains scrollable', async ({ page }) => {
	const repeater = page.locator('#verticalRepeater');
	const list = repeater.getByRole('list');

	await expect(list).toBeVisible();
	await expect.poll(() => list.evaluate(element => element.scrollHeight - element.clientHeight))
		.toBeGreaterThan(0);
	await list.hover();
	await page.mouse.wheel(0, 160);
	await expect.poll(() => list.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
});

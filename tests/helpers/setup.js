//Helpers
import { init as initLocationActions } from './awaitLocatorActions';

//Setup
export const openTestPage = async ({ page }) => {
	await page.goto('http://localhost:3000/test.html');
	initLocationActions({ page });
};

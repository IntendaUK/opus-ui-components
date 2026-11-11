import { expect, test } from '@playwright/test';

test('Notifications preserves messages queued while a batch is being consumed', async ({ page }) => {
	await page.goto('/test.html');

	const result = await page.evaluate(async () => {
		const { onGetMessage } = await import('/src/components/notifications/events.jsx');
		const { default: props } = await import('/src/components/notifications/props.js');
		const first = { msg: 'Model information failed.', autoClose: false };
		const second = { msg: 'Chat failed.', autoClose: false };
		let pending = props.newMsg.setAction([], first);
		let update;
		const consume = messages => onGetMessage({
			state: { newMsg: messages },
			setState: value => { update = value; }
		});

		consume(pending);
		pending = props.newMsg.setAction(pending, second);
		const snapshot = [...pending];
		const deletion = update.deleteKeys[0];
		const remaining = props.newMsg.deleteAction(pending, deletion.value);
		const firstRendered = Object.entries(update)
			.filter(([key]) => key.startsWith('message_')).map(([, value]) => value.msg);

		consume(remaining);
		const secondRendered = Object.entries(update)
			.filter(([key]) => key.startsWith('message_')).map(([, value]) => value.msg);
		const drained = props.newMsg.deleteAction(remaining, update.deleteKeys[0].value);
		const reset = props.newMsg.deleteAction(pending);
		const removeSingle = props.newMsg.deleteAction(pending, first);

		return {
			firstRendered, secondRendered,
			remaining: remaining.map(message => message.msg),
			drained,
			reset,
			removeSingle: removeSingle.map(message => message.msg),
			pendingUnchanged: pending.length === snapshot.length && pending.every((message, index) => message === snapshot[index])
		};
	});

	expect(result).toEqual({
		firstRendered: ['Model information failed.'],
		secondRendered: ['Chat failed.'],
		remaining: ['Chat failed.'],
		drained: [],
		reset: [],
		removeSingle: ['Chat failed.'],
		pendingUnchanged: true
	});
});

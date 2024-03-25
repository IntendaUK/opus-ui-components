//React
import { useEffect } from 'react';

//Plugins
import { io } from 'socket.io-client';

//Events
const onMount = ({ setState, state: { url, listenToEvents, socketOptions } }) => {
	const socket = io(url, {
		transports: ['websocket'],
		...socketOptions
	});

	listenToEvents.forEach(l => {
		const {
			event = l,
			stateKey = `t${event[0].toUpperCase()}${event.substr(1)}`,
			stateValue,
			mapFunctionString
		} = l;

		socket.on(event, e => {
			let setStateTo = stateValue ?? e ?? null;

			if (mapFunctionString) {
				/* eslint-disable-next-line no-eval */
				setStateTo = eval(mapFunctionString)(setStateTo);
			}

			setState({ [stateKey]: setStateTo });
		});
	});

	setState({ socket });
};

const onEmit = ({ setState, state: { socket, tEmit } }) => {
	if (!tEmit)
		return;

	const { event, msg, response } = tEmit;

	if (response) {
		const { stateKey, stateValue, mapFunctionString } = response;

		socket.emit(event, msg, res => {
			let setStateTo = stateValue ?? res ?? null;

			if (mapFunctionString) {
				/* eslint-disable-next-line no-eval */
				setStateTo = eval(mapFunctionString)(setStateTo);
			}

			setState({ [stateKey]: setStateTo });
		});
	} else
		socket.emit(event, msg);

	setState({ deleteKeys: ['tEmit'] });
};

//Export
export const WebSocket = ({ getHandler, state: { tEmit } }) => {
	useEffect(getHandler(onMount), []);
	useEffect(getHandler(onEmit), [JSON.stringify(tEmit)]);

	return null;
};

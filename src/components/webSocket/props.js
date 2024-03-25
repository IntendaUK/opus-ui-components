/* eslint-disable max-len */

//Props
const props = {
	url: {
		type: 'string',
		desc: 'The location of the websocket server'
	},
	socketOptions: {
		type: 'object',
		desc: 'Extra options to pass into the socket-io client when creating the connection. For more information, please refer to: https://socket.io/docs/v4/client-options/',
		dft: {}
	},
	listenToEvents: {
		type: 'array',
		desc: 'An array of events to listen to on the socket connection',
		spec: ['connect', 'disconnect', 'close', {
			event: 'The name of the event',
			stateKey: 'When a message is received, this state will be set on the component',
			stateValue: 'When a message is received, the state (stateKey) will be set to this value',
			mapFunctionString: 'A function string that will be called on the result before setting the state'
		}]
	},
	tEmit: {
		type: 'object',
		desc: 'When set, the "msg" will be sent to the websocket server',
		spec: {
			event: 'The name of the event',
			msg: 'The message to send to the websocket server',
			response: {
				stateKey: 'When a response is received, this state will be set on the component',
				stateValue: 'When a response is received, the state (stateKey) will be set to this value',
				mapFunctionString: 'A function string that will be called on the result before setting the state'
			}
		}
	}
};

export default props;

/* eslint-disable max-lines-per-function, max-lines */

// System
import React from 'react';
import ReactDOM from 'react-dom/client';

import './library';

// Opus Lib
import Opus from '@intenda/opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		startupMda={{
			type: 'containerSimple',
			prps: {
				gap: '24px'
			},
			wgts: [{
				type: 'label',
				prps: {
					cpt: 'This input only allows [a-z] and [A-z]'
				}
			}, {
				type: 'input',
				prps: {
					maskPlaceholder: '__-__',
					colorPlaceholder: 'primaryText',
					alwaysShowMask: true,
					mask: 'aa-aa'
				}
			}, {
				type: 'label',
				prps: {
					cpt: 'This input only allows [0-9]'
				}
			}, {
				type: 'input',
				prps: {
					maskPlaceholder: 'dd/mm/yyyy',
					colorPlaceholder: 'primaryText',
					alwaysShowMask: true,
					mask: '99/99/9999'
				}
			}, {
				type: 'label',
				prps: {
					cpt: 'This input only allows two numbers, then two letters, then 2 of anything'
				}
			}, {
				type: 'input',
				prps: {
					maskPlaceholder: 'xx | yy | zz',
					colorPlaceholder: 'primaryText',
					alwaysShowMask: true,
					mask: '99 | aa | **'
				}
			}]
		}}
	/>
);

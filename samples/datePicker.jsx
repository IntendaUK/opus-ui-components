/* eslint-disable max-lines-per-function, max-lines */

//System
import React from 'react';
import ReactDOM from 'react-dom/client';

import './library';

//Opus Lib
import Opus from '@intenda/opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				mainAxisAlign: 'center',
				crossAxisAlign: 'center'
			},
			wgts: [{
				scope: 'datePicker',
				type: 'datePicker',
				prps: {
					popoverZIndex: 2,
					closePopupOnClickSelectedDate: true,
					mdaExtraContainer: {
						type: 'container',
						prps: {
							marginTop: '15px',
							canClick: true,
							fireScript: {
								actions: [{
									type: 'setState',
									target: '||datePicker||',
									key: 'active',
									value: false
								}]
							}
						},
						wgts: [{
							type: 'label',
							prps: {
								cpt: 'Click me'
							}
						}]
					}
				}
			}]
		}}
	/>
);
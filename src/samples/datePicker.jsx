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
				type: 'datePicker',
				prps: {
					popoverZIndex: 1,
					closePopupOnClickSelectedDate: true
				}
			}]
		}}
	/>
);

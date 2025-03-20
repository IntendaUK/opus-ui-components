//Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

import Opus from '@intenda/opus-ui';
import './library';

//Sample
createRoot(document.getElementById('root'))
	.render(
		<Opus
			startupMda={{
				type: 'containerSimple',
				prps: {
					singlePage: true,
					backgroundColor: 'lightGrey',
					mainAxisAlign: 'center',
					crossAxisAlign: 'center',
					gap: '24px'
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: '@intenda/opus-ui-components',
						fontSize: '32px',
						color: '#222'
					}
				}, {
					type: 'label',
					prps: {
						cpt: 'Check out the samples for more info...',
						fontSize: '18px',
						color: '#888'
					}
				}]
			}}
		/>
	);
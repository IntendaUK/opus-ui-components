// Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

import Opus from '@intenda/opus-ui';
import './library';

// Sample
createRoot(document.getElementById('root'))
	.render(
		<Opus
			startupMda={{
				scope: 'treeview',
				type: 'treeview',
				prps: {
					dtaAtr: 'id',
					disAtr: 'name',
					childAtr: 'children',
					staticData: [
						{
							id: '',
							name: 'Tree Root',
							isRoot: true,
							children: [
								{
									id: 'things',
									name: 'Things',
									children: [
										{ id: 'door', name: 'Door' },
										{ id: 'floor', name: 'Floor' },
										{ id: 'banana', name: 'Banana' }
									]
								}
							]
						}
					]
				}
			}}
		/>
	);

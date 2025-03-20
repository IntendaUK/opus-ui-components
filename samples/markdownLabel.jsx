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
				type: 'markdownLabel',
				prps: {
					cpt: `# I am an h1
[Normal link](https://www.google.com)
[{"cpt": "Link that should open in a new tab", "attributes": {"target": "_blank"}}](https://www.google.com)
\`{
	"cpt": "Link that calls a script",
	"style": "actionLink",
	"script": {
		"actions": [{
			"type": "log",
			"msg": "Yes!!!"
		}]
	}
}\`
`,
					allowScriptAnchors: true,
					allowAnchorAttributes: true,
					overrideStyles: { actionLink: { color: 'red' } },
					assignIdsToHeadingTypes: ['h1']
				}
			}]
		}}
	/>
);
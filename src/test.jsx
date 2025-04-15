//Opus
import { loadApp } from '@intenda/opus-ui';

import './library';

// Main
(async() => {
	const res = await fetch('/app.json');
	const mdaPackage = await res.json();

	loadApp({
		mdaPackage,
		loadUrlParameters: true,
		config: {
			env: 'development',
			...window.opusConfig
		}
	});
})();
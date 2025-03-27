//Opus
import { loadApp } from '@intenda/opus-ui';

import './library';

// Main
(async() => {
	const env = import.meta.env.VITE_APP_MODE;

	const res = await fetch('/app.json');
	const mdaPackage = await res.json();

	loadApp({
		mdaPackage,
		loadUrlParameters: true,
		config: {
			env,
			...window.opusConfig
		}
	});
})();
/* eslint-disable max-lines-per-function, max-lines */

// System
import React from 'react';
import ReactDOM from 'react-dom/client';

import './library';

// Opus Lib
import Opus from '@intenda/opus-ui';

const heading = cpt => ({
	type: 'label',
	prps: {
		cpt,
		fontSize: 'large',
		fontWeight: 'bold',
		marginTop: '20px'
	}
});

const note = cpt => ({
	type: 'label',
	prps: {
		cpt,
		fontSize: 'small',
		color: 'secondary'
	}
});

const input = prps => ({
	type: 'input',
	prps: {
		width: '300px',
		padding: true,
		hasBottomBorder: true,
		...prps
	}
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				padding: '24px',
				gap: '12px',
				mainAxisAlign: 'flex-start',
				crossAxisAlign: 'flex-start'
			},
			wgts: [{
				type: 'label',
				prps: {
					cpt: 'Input Variants',
					fontSize: 'giant',
					fontWeight: 'bold',
					marginBottom: '8px'
				}
			},
			heading('Basic text input'),
			input({
				cpt: 'Name',
				value: 'Ada Lovelace',
				placeholder: 'Enter a name'
			}),
			heading('Placeholder only'),
			input({
				cpt: 'Email address',
				dataType: 'email',
				placeholder: 'name@example.com'
			}),
			heading('Number input'),
			input({
				cpt: 'Quantity',
				dataType: 'integer',
				value: 42,
				hideNumberArrows: true
			}),
			heading('Password input'),
			input({
				cpt: 'Password',
				dataType: 'password',
				value: 'secret-value'
			}),
			heading('Read-only input'),
			input({
				cpt: 'Reference',
				value: 'INV-2026-0001',
				readOnly: true
			}),
			heading('Multiline input'),
			input({
				cpt: 'Notes',
				multiline: true,
				value: 'This variant uses a textarea.\nIt intentionally does not receive attrsInput.',
				height: '150px'
			}),
			heading('Regular input with attrsInput'),
			note('Inspect the actual input element to see data-test, aria-label, and autocomplete attached to the input instead of the outer cpnInput div.'),
			input({
				cpt: 'Search',
				value: 'Injected attributes',
				placeholder: 'Search...',
				dataTest: 'input-attrs-sample',
				ariaLabelValue: 'Search with injected aria label',
				autocompleteValue: 'off',
				attrsInput: [{
					key: 'dataTest',
					attr: 'data-test'
				}, {
					key: 'ariaLabelValue',
					attr: 'aria-label'
				}, {
					key: 'autocompleteValue',
					attr: 'autoComplete'
				}]
			}),
			heading('File input'),
			input({
				cpt: 'Upload files',
				dataType: 'file',
				canSelectMultipleFiles: true
			})]
		}}
	/>
);
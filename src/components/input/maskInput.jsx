//React
import React, { useLayoutEffect, useMemo, useRef } from 'react';

//Helpers
import { parseMask, extractEditable, formatMask, caretAfterEditable } from './maskUtils';

/*
	Native masked input. Replaces @mona-health/react-input-mask (CJS, pulled require('react')
	into the bundle). Implements the surface opus-ui uses:
	  props: mask (string), maskPlaceholder (default '_', null/'' = no placeholder),
	         alwaysShowMask, value (controlled), onChange (fires with masked target.value),
	         plus all standard input props.
*/

export const MaskInput = props => {
	const { mask = '', maskPlaceholder, alwaysShowMask = false, value, onChange, ...rest } = props;

	const inputRef = useRef(null);
	const caretRef = useRef(null);

	const tokens = useMemo(() => parseMask(mask), [mask]);
	const editableCount = useMemo(() => tokens.filter(t => t.type === 'editable').length, [tokens]);
	const placeholder = maskPlaceholder === null || maskPlaceholder === undefined ? '_' : String(maskPlaceholder);

	const rawChars = extractEditable(String(value ?? ''), tokens, placeholder).slice(0, editableCount);
	const display = formatMask(rawChars, tokens, placeholder, alwaysShowMask);

	useLayoutEffect(() => {
		if (caretRef.current != null && inputRef.current) {
			inputRef.current.setSelectionRange(caretRef.current, caretRef.current);
			caretRef.current = null;
		}
	});

	const handleChange = e => {
		const input = inputRef.current;
		const newStr = e.target.value;
		const rawCaret = e.target.selectionStart == null ? newStr.length : e.target.selectionStart;

		const editableBefore = extractEditable(newStr.slice(0, rawCaret), tokens, placeholder).length;
		const newRaw = extractEditable(newStr, tokens, placeholder).slice(0, editableCount);
		const masked = formatMask(newRaw, tokens, placeholder, alwaysShowMask);
		const caret = caretAfterEditable(masked, tokens, Math.min(editableBefore, newRaw.length));

		// Set value + caret synchronously so the forwarded event carries the masked value.
		input.value = masked;
		input.setSelectionRange(caret, caret);
		caretRef.current = caret;

		if (onChange)
			onChange(e);
	};

	return (
		<input
			{...rest}
			ref={inputRef}
			value={display}
			onChange={handleChange}
		/>
	);
};

export default MaskInput;

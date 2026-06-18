/*
	Pure helpers for the native masked input (no React) so they can be unit-tested.
	Mask tokens: 9 = digit, a = letter, * = alphanumeric, \\ escapes the next char as a
	literal, any other char is a literal.
*/

export const TOKEN_TESTS = {
	'9': /[0-9]/,
	a: /[A-Za-z]/,
	'*': /[A-Za-z0-9]/
};

export const parseMask = mask => {
	const tokens = [];

	for (let i = 0; i < mask.length; i++) {
		const ch = mask[i];

		if (ch === '\\') {
			i++;
			tokens.push({ type: 'static', char: mask[i] });
			continue;
		}

		const rx = TOKEN_TESTS[ch];

		if (rx)
			tokens.push({ type: 'editable', test: c => rx.test(c) });
		else
			tokens.push({ type: 'static', char: ch });
	}

	return tokens;
};

// Pull the user-entered (editable) chars out of an arbitrary string, in order.
export const extractEditable = (str, tokens, placeholder) => {
	const staticChars = new Set(tokens.filter(t => t.type === 'static').map(t => t.char));
	const editTokens = tokens.filter(t => t.type === 'editable');
	const out = [];
	let ei = 0;

	for (const ch of str) {
		if (ei >= editTokens.length)
			break;

		if (placeholder && ch === placeholder)
			continue;

		if (staticChars.has(ch))
			continue;

		if (editTokens[ei].test(ch)) {
			out.push(ch);
			ei++;
		}
	}

	return out;
};

// Build the masked display string from the editable chars.
export const formatMask = (rawChars, tokens, placeholder, showWhenEmpty) => {
	const hasPlaceholder = placeholder !== '' && placeholder != null;

	if (rawChars.length === 0 && !showWhenEmpty)
		return '';

	let out = '';
	let ri = 0;

	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i];

		if (t.type === 'static') {
			out += t.char;
			continue;
		}

		if (ri < rawChars.length)
			out += rawChars[ri++];
		else if (hasPlaceholder)
			out += placeholder;
		else
			break;
	}

	return out;
};

// Caret position after the nth editable cell (skipping following statics).
export const caretAfterEditable = (out, tokens, n) => {
	if (n <= 0) {
		let i = 0;

		while (i < out.length && tokens[i] && tokens[i].type === 'static')
			i++;

		return i;
	}

	let count = 0;

	for (let i = 0; i < out.length; i++) {
		if (tokens[i] && tokens[i].type === 'editable') {
			count++;

			if (count === n) {
				let j = i + 1;

				while (j < out.length && tokens[j] && tokens[j].type === 'static')
					j++;

				return j;
			}
		}
	}

	return out.length;
};

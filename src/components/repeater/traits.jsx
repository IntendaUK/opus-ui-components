/*
	Shared trait-application helpers used by components that build Opus node MDA on the fly
	(repeater rows, treeview nodes). These apply functional traits directly as React — calling the
	trait function and merging its config into the node — instead of leaving a trait-path string for
	the runtime to resolve from JSON metadata.

	A trait reference can arrive in several shapes:
	  - a bare function (a transpiled trait module imported directly by the transpiler)
	  - { type: fn, traitPrps } (already normalised)
	  - { trait: fn, traitPrps } (a transpiled reference still wrapped in the MDA trait-entry shape)
	  - a path string (resolved at runtime through the dynamic-trait registry, when available)
*/

//Merge a node's traits into it. Functional traits return a config object whose array props (scps,
// flows, …) are concatenated and whose remaining keys are assigned, matching the runtime's
// applyTraits behaviour.
export const applyTraits = ({ sysPrps = {}, prps = {}, traits = [] }) => {
	const arrayPrps = [
		'scps',
		'flows',
		'morphProps',
		'lookupFilters',
		'lookupFlows',
		'traitMappings'
	];

	const res = {
		...sysPrps,
		prps: {
			...prps
		}
	};

	traits.forEach(t => {
		if (!t)
			return;

		const traitRes = typeof(t.type) === 'function'
			? t.type(t.traitPrps ?? {})
			: t;

		if (!traitRes)
			return;

		if (res.scope && traitRes.scope) {
			const combinedScope = Array.isArray(res.scope) ? res.scope : [res.scope];

			if (Array.isArray(traitRes.scope)) {
				traitRes.scope.forEach(s => {
					if (!combinedScope.includes(s))
						combinedScope.push(s);
				});
			} else if (!combinedScope.includes(traitRes.scope))
				combinedScope.push(traitRes.scope);

			res.scope = combinedScope;

			delete traitRes.scope;
		}

		arrayPrps.forEach(p => {
			if (traitRes?.prps?.[p]?.length && res?.prps?.[p]?.length) {
				res.prps[p].push(...traitRes.prps[p]);

				delete traitRes.prps[p];
			}
		});

		if (traitRes?.prps)
			Object.assign(res.prps, { ...traitRes.prps });

		Object.keys(traitRes).forEach(key => {
			if (key === 'prps')
				return;

			res[key] = traitRes[key];
		});
	});

	return res;
};

//Normalise a single trait reference into { type: fn, traitPrps } form, or null if it cannot be
// resolved (in which case the caller should leave it for the runtime to handle).
export const normalizeTrait = (trait, resolveDynamicTrait) => {
	if (!trait)
		return null;

	//Already normalised.
	if (trait.type)
		return trait;

	//A bare function — a transpiled trait module imported directly by the transpiler.
	if (typeof(trait) === 'function')
		return { type: trait, traitPrps: {} };

	//{ trait: <fn|string>, traitPrps }: the MDA trait-entry shape. A function value is a transpiled
	// reference and can be used directly; a string value is resolved through the registry below.
	const traitRef = trait.trait ?? trait;

	if (typeof(traitRef) === 'function')
		return { type: traitRef, traitPrps: trait.traitPrps ?? {} };

	if (typeof(traitRef) !== 'string' || traitRef.indexOf('{{') === 0)
		return null;

	const type = resolveDynamicTrait?.(traitRef);

	if (!type)
		return null;

	return {
		type,
		traitPrps: trait.traitPrps ?? {}
	};
};

export const normalizeTraits = (traits, resolveDynamicTrait) => {
	if (!Array.isArray(traits))
		return [];

	return traits
		.map(trait => normalizeTrait(trait, resolveDynamicTrait))
		.filter(Boolean);
};

export const applyNodeTraits = (node, resolveDynamicTrait) => {
	if (!node?.traits)
		return node;

	const traits = normalizeTraits(node.traits, resolveDynamicTrait);

	if (!traits.length)
		return node;

	const { id, scope, relId, prps, traits: _traits, ...otherRest } = node;

	return {
		...applyTraits({
			sysPrps: {
				id,
				scope,
				relId
			},
			prps,
			traits
		}),
		...otherRest
	};
};

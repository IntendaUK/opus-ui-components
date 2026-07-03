//React
import React, { useContext, useEffect, useMemo } from 'react';

//System
import { createContext, DataLoaderHelper } from '@intenda/opus-ui';

//Helpers
import { generateWrapperMda } from './helpers';
import { applyNodeTraits } from './traits';

//Plugins
import { List } from 'react-window';

//Context
const RepeaterContext = createContext('repeaterContext');

const buildVirtualizedChildData = ({ ChildWgt, state: { childMda, resolveDynamicTrait } }) => {
	if (!childMda)
		return;

	const itemData = childMda.map(c => {
		const key = c.relId || c.id;

		if (typeof(c.type) === 'function') {
			return {
				key,
				el: renderOpusNode(c, key, resolveDynamicTrait)
			};
		}

		return {
			key,
			el: <ChildWgt key={key} mda={c} />
		};
	});

	return itemData;
};

//Events
const onMount = props => {
	const { setState, state: { rowMda, data } } = props;

	if (!data)
		return;

	const childMda = data.map((rowData, i) => {
		const wgtMda = generateWrapperMda(props, data, i, rowMda);

		return wgtMda;
	});

	setState({ childMda });
};

const renderOpusNodeOld = (c, key = undefined) => {
	if (!c)
		return null;

	const { type: Type, wgts, ...rest } = c;

	let childWgts = null;

	if (Array.isArray(wgts) && wgts.length > 0) {
		childWgts = wgts.map((child, i) => {
			const childKey = child.relId || child.id;

			return renderOpusNode(child, childKey);
		});
	}

	// If the component has children, pass them as JSX children.
	// This keeps the render signature simple and works with standard React components.
	if (childWgts) {
		return (
			<Type key={key} {...rest}>
				{childWgts}
			</Type>
		);
	}

	// No children
	return (
		<Type key={key} {...rest} />
	);
};

const isOpusNode = value => {
	return (
		value &&
		typeof value === 'object' &&
		typeof value.type === 'function'
	);
};

//Row-prop keys whose value is metadata that is NOT rendered here — leave it as metadata rather than
// eagerly rendering nested { type: <component> } nodes into React elements. Eagerly rendering would
// leave a live React element (with circular _owner -> Fiber -> DOM back-references) in the row's
// props, which the prop pipeline (clone / buildMorphProps) then deep-walks -> "too much recursion".
// Per-row ((rowData…)) tokens inside these are still injected: that happens in the earlier
// replacePrpEntries/directReplace pass, not here.
//  - rowMda: a nested repeater renders its own rows.
//  - tooltipMda: the popover renders it lazily on hover.
//  - fireScript / scps / flows: script & flow payloads. Any widget metadata inside (e.g. a setState's
//    ^value.tabContents) is DATA, rendered later by its consumer (e.g. extraWgts -> wrapWidgets when
//    the tab opens) — never at row-build time.
//  - conditionalRootTypes: a descriptor list of { condition, type, traitPrps } produced by the
//    transpiler from Opus conditional traits. renderConditionalRootType picks the entry whose
//    condition matches and renders that `type`. Each entry has a function `type`, so without this
//    exemption transformValue would render the descriptor itself into an element and strip `condition`
//    (-> isConditionMet(undefined) -> "operator is undefined"). In the original JSON the equivalent was
//    a `trait` path *string* that nothing rendered, so this restores that "don't render" property.
const NON_RENDERED_MDA_KEYS = new Set([
	'rowMda',
	'tooltipMda',
	'fireScript',
	'scps',
	'flows',
	'conditionalRootTypes'
]);

const transformValue = (value, key = undefined, resolveDynamicTrait) => {
	//Leave metadata that is rendered elsewhere/on demand untouched (see NON_RENDERED_MDA_KEYS).
	if (value == null || NON_RENDERED_MDA_KEYS.has(key))
		return value;

	if (Array.isArray(value)) {
		return value.map((item, i) => {
			return transformValue(item, i, resolveDynamicTrait);
		});
	}

	if (isOpusNode(value))
		return renderOpusNode(value, key, resolveDynamicTrait);

	if (typeof value === 'object') {
		const result = {};

		Object.keys(value).forEach(propKey => {
			result[propKey] = transformValue(value[propKey], propKey, resolveDynamicTrait);
		});

		return result;
	}

	return value;
};

const renderOpusNode = (node, key = undefined, resolveDynamicTrait) => {
	if (!node)
		return null;

	const finalNode = applyNodeTraits(node, resolveDynamicTrait);
	const { type: Type, wgts, ...rest } = finalNode;

	const transformedRest = transformValue(rest, undefined, resolveDynamicTrait);

	let children = null;

	if (Array.isArray(wgts) && wgts.length > 0) {
		children = wgts.map((child, i) => {
			const childKey = child.relId || child.id || i;

			return renderOpusNode(child, childKey, resolveDynamicTrait);
		});
	}

	if (children) {
		return (
			<Type key={key} {...transformedRest}>
				{children}
			</Type>
		);
	}

	return (
		<Type key={key} {...transformedRest} />
	);
};

//Components
const RepeaterInner = () => {
	const props = useContext(RepeaterContext);
	const { ChildWgt, state: { x, childMda, resolveDynamicTrait } } = props;

	if (!childMda)
		return null;

	const result = childMda.map(c => {
		const key = c.relId || c.id;

		if (typeof(c.type) === 'function') {
			const res = renderOpusNode(c, key, resolveDynamicTrait);

			return res;
		}

		return (
			<ChildWgt key={key} mda={c} />
		);
	});

	return result;
};

// react-window v2 row component: receives { index, style, ...rowProps }.
const VirtualizedRow = ({ index, style, data }) => (
	<div style={style} id={data[index].key + 'outer'}>
		{data[index].el}
	</div>
);

const VirtualizedInner = () => {
	const { id, getHandler, state } = useContext(RepeaterContext);
	const { childMda, width, height, invisibleScrollbars, virtualizedItemSize, prpsVirtualizedContainer } = state;

	const itemData = useMemo(getHandler(buildVirtualizedChildData), [childMda]);

	if (!childMda)
		return null;

	const heightPx = +((height + '').replace('px', ''));
	const widthPx = +((width + '').replace('px', ''));
	const hasHeight = Number.isFinite(heightPx);
	const hasWidth = Number.isFinite(widthPx);

	//react-window v1's FixedSizeList took an explicit `height` *prop*; v2's List instead measures its
	// own element (using `defaultHeight` only until measured). So the List must render into an element
	// that actually has a size, or it measures 0 after first paint and drops every row. We give an
	// OUTER element that element size — the consumer's px height/width when provided (the documented
	// virtualization contract), else fill the parent — and have the List fill it. The outer also carries
	// the repeater `id` (the v2 upgrade deleted the old id-bearing VirtualizedOuter), so the height /
	// dataLoader id-lookups elsewhere resolve again.
	const outerStyle = {
		position: 'relative',
		minHeight: 0,
		height: hasHeight ? heightPx : '100%',
		width: hasWidth ? widthPx : '100%'
	};

	const listPrps = {
		className: invisibleScrollbars ? 'invisibleScrollbars' : '',
		style: { height: '100%', width: '100%' },
		rowComponent: VirtualizedRow,
		rowCount: childMda.length,
		rowHeight: virtualizedItemSize,
		rowProps: { data: itemData },
		...prpsVirtualizedContainer
	};

	//SSR/initial height before the List measures its element — use the consumer px if given.
	if (hasHeight)
		listPrps.defaultHeight = heightPx;

	return (
		<div id={id} style={outerStyle}>
			<List {...listPrps} />
		</div>
	);
};

//Export
export const Repeater = props => {
	const { getHandler, state: { data, virtualized } } = props;

	useEffect(getHandler(onMount), [JSON.stringify(data)]);

	const Inner = virtualized ? VirtualizedInner : RepeaterInner;

	return (
		<RepeaterContext.Provider value={props}>
			<DataLoaderHelper ownerPrps={props} />
			<Inner />
		</RepeaterContext.Provider>
	);
};

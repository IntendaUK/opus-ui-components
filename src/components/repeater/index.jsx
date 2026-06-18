//React
import React, { useContext, useEffect, useMemo } from 'react';

//System
import { createContext, DataLoaderHelper } from '@intenda/opus-ui';

//Helpers
import { generateWrapperMda } from './helpers';

//Plugins
import { List } from 'react-window';

//Context
const RepeaterContext = createContext('repeaterContext');

//Helpers
const buildVirtualizedChildData = ({ ChildWgt, state: { childMda } }) => {
	if (!childMda)
		return;

	const itemData = childMda.map(c => {
		const key = c.relId || c.id;

		if (typeof(c.type) === 'function') {
			const { type: Type, ...rest } = c;

			return (
				<Type key={key } {...rest} />
			);
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

const transformValue = (value, key = undefined) => {
	//If a repeater row also contains a repeater, don't mess with its rowMda
	if (value == null || key === 'rowMda')
		return value;

	if (Array.isArray(value)) {
		return value.map((item, i) => {
			return transformValue(item, i);
		});
	}

	if (isOpusNode(value))
		return renderOpusNode(value, key);

	if (typeof value === 'object') {
		const result = {};

		Object.keys(value).forEach(propKey => {
			result[propKey] = transformValue(value[propKey], propKey);
		});

		return result;
	}

	return value;
};

const renderOpusNode = (node, key = undefined) => {
	if (!node)
		return null;

	const { type: Type, wgts, ...rest } = node;

	const transformedRest = transformValue(rest);

	let children = null;

	if (Array.isArray(wgts) && wgts.length > 0) {
		children = wgts.map((child, i) => {
			const childKey = child.relId || child.id || i;

			return renderOpusNode(child, childKey);
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
	const { ChildWgt, state: { x, childMda } } = props;

	if (!childMda)
		return null;

	const result = childMda.map(c => {
		const key = c.relId || c.id;

		if (typeof(c.type) === 'function') {
			const res = renderOpusNode(c, key);

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

	const style = {};
	const heightPx = height ? +((height + '').replace('px', '')) : undefined;

	if (width)
		style.width = +((width + '').replace('px', ''));
	if (heightPx)
		style.height = heightPx;

	const listPrps = {
		id,
		className: invisibleScrollbars ? 'invisibleScrollbars' : '',
		style,
		rowComponent: VirtualizedRow,
		rowCount: childMda.length,
		rowHeight: virtualizedItemSize,
		rowProps: { data: itemData },
		...prpsVirtualizedContainer
	};

	if (heightPx)
		listPrps.defaultHeight = heightPx;

	return <List {...listPrps} />;
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
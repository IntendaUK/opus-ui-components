//React
import React, { useContext, useEffect, useMemo, forwardRef, useCallback } from 'react';

//System
import { createContext, DataLoaderHelper } from '@intenda/opus-ui';

//Helpers
import { generateWrapperMda } from './helpers';

//Plugins
import { FixedSizeList as List } from 'react-window';

//Context
const RepeaterContext = createContext('repeaterContext');

//Helpers
const buildVirtualizedChildData = ({ ChildWgt, state: { childMda } }) => {
	if (!childMda)
		return;

	const itemData = childMda.map(c => {
		const key = c.relId || c.id;

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

//Components
const RepeaterInner = () => {
	const props = useContext(RepeaterContext);
	const { ChildWgt, state: { childMda } } = props;

	if (!childMda)
		return null;

	const result = childMda.map(c => {
		const key = c.relId || c.id;

		return (
			<ChildWgt key={key} mda={c} />
		);
	});

	return result;
};

const VirtualizedOuter = (p, ref) => {
	const { id, state: { invisibleScrollbars } } = useContext(RepeaterContext);

	const className = invisibleScrollbars ? 'invisibleScrollbars' : '';

	return (
		<div
			id={id}
			ref={ref}
			{...p}
			className={className}
		/>
	);
};

const VirtualizedItem = ({ index, style, data }) => (
	<div style={style} id={data[index].key + 'outer'}>
		{data[index].el}
	</div>
);

const VirtualizedInner = () => {
	const { id, getHandler, state } = useContext(RepeaterContext);
	const { childMda, width, height, prpsVirtualizedContainer } = state;
	const { virtualizedDirection, virtualizedItemSize } = state;

	const itemData = useMemo(getHandler(buildVirtualizedChildData), [childMda]);

	const outer = useMemo(() => forwardRef(VirtualizedOuter), []);
	const inner = useCallback(VirtualizedItem, []);

	if (!childMda)
		return null;

	const listPrps = {
		id,
		itemCount: childMda.length,
		itemSize: virtualizedItemSize,
		layout: virtualizedDirection,
		itemData,
		outerElementType: outer,
		...prpsVirtualizedContainer
	};

	if (width)
		listPrps.width = +((width + '').replace('px', ''));
	if (height)
		listPrps.height = +((height + '').replace('px', ''));

	return (
		<List {...listPrps}>
			{inner}
		</List>
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

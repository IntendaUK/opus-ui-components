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

//React
import React, { useContext, useEffect, useMemo, forwardRef, useCallback } from 'react';

//System
import { createContext, DataLoaderHelper } from '@intenda/opus-ui';

//Helpers
import { generateWrapperMda } from './helpers';

//Plugins
import { List } from 'react-window';

//Context
const RepeaterContext = createContext('repeaterContext');

//Helpers
const buildVirtualizedChildData = (ChildWgt, childMda) => {
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
	const { setState, state: { rowMda, data, childMda: existingChildMda } } = props;

	if (!data)
		return;

	const newChildMda = data.map((rowData, i) =>
		generateWrapperMda(props, data, i, rowMda)
	);

	if (JSON.stringify(newChildMda) !== JSON.stringify(existingChildMda))
		setState({ childMda: newChildMda });
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

const VirtualizedOuter = forwardRef((p, ref) => {
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
});

const VirtualizedInner = () => {
	const { id, state } = useContext(RepeaterContext);
	const { childMda, width, height } = state;
	const { prpsVirtualizedContainer = {}, virtualizedDirection, virtualizedItemSize } = state;

	if (!childMda)
		return null;

	const rows = useMemo(
		() =>
			childMda.map(c => ({
				key: c.relId || c.id,
				el: <ChildWgt key={c.relId || c.id} mda={c} />
			})),
		[ChildWgt, childMda]
	);

	const rowComponent = useCallback(
		({ index, style }) => (
			<div style={style} id={`${rows[index].key}-outer`}>
				{rows[index].el}
			</div>
		),
		[rows]
	);

	const listProps = {
		id,
		rowComponent,
		rowCount: rows.length,
		rowHeight: virtualizedItemSize,
		rowProps: {},
		direction: virtualizedDirection,
		style: {
			width: parseInt(width || '0', 10) || undefined,
			height: parseInt(height || '0', 10) || undefined
		},
		tagName: VirtualizedOuter,
		...prpsVirtualizedContainer
	};

	return <List {...listProps} />;
};

export const Repeater = props => {
	const { getHandler, state: { data, virtualized } } = props;

	useEffect(() => {
		getHandler(onMount)();
	}, [data]);

	const Inner = virtualized ? VirtualizedInner : RepeaterInner;

	return (
		<RepeaterContext.Provider value={props}>
			<DataLoaderHelper ownerPrps={props} />
			<Inner />
		</RepeaterContext.Provider>
	);
};

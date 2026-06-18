//React
import React, { useContext, useEffect, useMemo } from 'react';

//System
import { createContext, ThemedComponent, DataLoaderHelper } from '@intenda/opus-ui';

//Events
import onBuildMda from './events/onBuildMda';
import onProcessData from './events/onProcessData';
import onRefreshNode from './events/onRefreshNode';
import onSetChildData from './events/onSetChildData';
import onToggleParent from './events/onToggleParent';
import onRefreshParentNode from './events/onRefreshParentNode';

//Styles
import './styles.css';

//Context
const TreeContext = createContext('treeview');

//Helpers
const renderOpusNode = (c, key = undefined) => {
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

//Components
const TreeviewInner = () => {
	const { ChildWgt, state: { mdaChildren } } = useContext(TreeContext);

	if (!mdaChildren)
		return null;

	let result;

	if (typeof(mdaChildren.type) === 'function')
		result = renderOpusNode(mdaChildren, mdaChildren.id);
	else
		result = <ChildWgt key={mdaChildren.id} mda={mdaChildren} />

	return result;

	/*return (
		<ThemedComponent mda={mdaChildren} />
	);*/
};

export const Treeview = props => {
	const { id, getHandler, classNames, style, attributes, state } = props;
	const { data, expandedNodes, mdaChildren } = state;
	const { tToggleParent, tSetChildData, tRefreshNode, tRefreshParentNode } = state;

	useEffect(getHandler(onProcessData), [JSON.stringify(data)]);
	useEffect(getHandler(onBuildMda), [JSON.stringify(data), JSON.stringify(expandedNodes)]);

	useEffect(getHandler(onRefreshNode), [tRefreshNode]);
	useEffect(getHandler(onToggleParent), [tToggleParent]);
	useEffect(getHandler(onRefreshParentNode), [tRefreshParentNode]);
	useEffect(getHandler(onSetChildData), [JSON.stringify(tSetChildData)]);

	const TreeviewInnerMemo = useMemo(() => <TreeviewInner />, [JSON.stringify(mdaChildren)]);

	return (
		<TreeContext.Provider value={props}>
			<div
				id={id}
				style={style}
				className={classNames}
				{...attributes}
			>
				<DataLoaderHelper ownerPrps={props} />
				{TreeviewInnerMemo}
			</div>
		</TreeContext.Provider>
	);
};
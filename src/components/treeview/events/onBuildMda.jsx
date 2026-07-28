/* eslint-disable max-lines-per-function */

//External Helpers
import { generateWrapperMda } from '../../repeater/helpers';
import { normalizeTrait, applyTraits } from '../../repeater/traits';

//Events
import onDropNode from './onDropNode';

//Helpers
import buildNodeId from '../helpers/buildNodeId';

//Apply a node's traits directly as React: functional traits (transpiled trait modules imported
// directly, or {trait} references) are called and their config merged into the node here, so the
// node renders as a plain library component without the runtime resolving the trait paths from JSON
// metadata. Any reference that cannot be normalised (e.g. a path string with no dynamic-trait
// registry available) is left on the node for the runtime to resolve, preserving prior behaviour.
const applyTreeNodeTraits = (mda, resolveDynamicTrait) => {
	if (!Array.isArray(mda?.traits) || !mda.traits.length)
		return mda;

	const resolved = [];
	const unresolved = [];

	mda.traits.forEach(trait => {
		const normalized = normalizeTrait(trait, resolveDynamicTrait);

		if (normalized)
			resolved.push(normalized);
		else
			unresolved.push(trait);
	});

	if (!resolved.length)
		return mda;

	const { id, scope, relId, prps, traits, ...otherRest } = mda;

	const applied = {
		...applyTraits({ sysPrps: { id, scope, relId }, prps, traits: resolved }),
		...otherRest
	};

	if (unresolved.length)
		applied.traits = unresolved;

	return applied;
};

//Helpers
const buildCanDragContents = (props, data, id, label) => {
	const { getHandler, state: { recordAtr, dragTargets, prpsContainerDnd } } = props;

	const handlerOnDrop = getHandler(onDropNode);

	const contents = {
		id: id + 'dnd',
		type: 'containerDnd',
		scope: 'treenodednd',
		prps: {
			dragTargets,
			dir: 'horizontal',
			overflow: 'hidden',
			removeOnDrop: false,
			addOnDrop: false,
			dropPlaceholderMda: {
				id: 'dropper' + id,
				type: 'icon',
				prps: {
					color: 'mediumGrey',
					value: 'add'
				}
			},
			handlerOnDrop,
			...prpsContainerDnd
		},
		wgts: [
			{
				id: id + 'inner',
				type: 'containerSimple',
				prps: { flex: true },
				wgts: [
					{
						id: id + 'dragger',
						type: 'dragger',
						scope: 'treenodedragger',
						prps: {
							flex: true,
							[recordAtr]: data,
							recordAtr
						},
						wgts: [label]
					}
				]
			}
		]
	};

	return contents;
};

const buildContents = (props, data, id, label) => {
	const { state: { prpsContainerDnd } } = props;

	const contents = {
		id: id + 'dnd',
		type: 'containerSimple',
		scope: 'treenodednd',
		prps: {
			dir: 'horizontal',
			overflow: 'hidden',
			...prpsContainerDnd
		},
		wgts: [
			{
				id: id + 'inner',
				type: 'containerSimple',
				prps: { flex: true },
				wgts: [label]
			}
		]
	};

	return contents;
};

const buildLabel = (props, data) => {
	const { state: { dtaAtr, mdaLabel, renderExpander, mdaExpander } } = props;

	const label = generateWrapperMda(props, [data], 0, mdaLabel);

	if (renderExpander) {
		const expander = generateWrapperMda(props, [data], 0, mdaExpander);

		expander.prps.vis = !!props.state[`childData-${data[dtaAtr]}`];

		label.wgts.splice(0, 0, expander);
	}

	return label;
};

const recurse = (props, data, level = 0, index = 0) => {
	const { state: { childAtr, dtaAtr } } = props;
	const { state: { levelLeftMarginSize, expandedNodes, noPad, canDragAndDrop } } = props;
	const { state: { traitsTreeNode, prpsTreeNode, resolveDynamicTrait } } = props;

	const id = buildNodeId(props, data);

	const expanded = expandedNodes.some(e => e === data[dtaAtr]);

	const fnContents = canDragAndDrop ? buildCanDragContents : buildContents;

	const label = buildLabel(props, data);

	const contents = fnContents(props, data, id, label);

	const mda = {
		scope: 'treenode',
		id: id + 'container',
		parentId: props.id,
		type: 'containerSimple',
		auth: ['data', 'expanded'],
		traits: traitsTreeNode,
		prps: {
			dir: 'vertical',
			marginLeft: (level && !noPad) ? levelLeftMarginSize : undefined,
			data,
			expanded,
			isFirstNode: index === 0,
			level,
			...prpsTreeNode
		},
		wgts: [contents]
	};

	mda.wgts.push({
		id: id + 'children',
		type: 'containerSimple',
		prps: {
			dir: 'vertical',
			vis: !!expanded
		},
		auth: ['vis'],
		wgts: data[childAtr]?.map((c, i) => recurse(props, c, level + 1, i))
	});

	return applyTreeNodeTraits(mda, resolveDynamicTrait);
};

//Event
const onBuildMda = props => {
	const { setState, state: { data, tSetChildData } } = props;

	if (!data?.processed || tSetChildData?.length)
		return;

	const mdaChildren = recurse(props, data);

	setState({ mdaChildren });
};

export default onBuildMda;

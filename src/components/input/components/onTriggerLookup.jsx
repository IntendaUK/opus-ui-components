//System Helpers
import { getScopedId } from '@intenda/opus-ui';

//Internals
const defaultPassthroughPrps = [
	'lookup',
	'lookupMda',
	'lookupPrps',
	'lookupWgts',
	'lookupData',
	'lookupFlows',
	'lookupDtaObj',
	'lookupFilters',
	'lookupStyleOverrides'
];

//Helper
const onTriggerLookup = ({ id, setState, setWgtState, state }) => {
	const { open, boxRef, lookupPassthroughPrps = [], triggerOpenLookup, lookupAnchorId } = state;

	if (!triggerOpenLookup || !open)
		return;

	const passthroughPrps = [
		...defaultPassthroughPrps,
		...lookupPassthroughPrps
	];

	let element = boxRef.current;
	let elementId = lookupAnchorId;
	if (lookupAnchorId?.includes('||'))
		elementId = getScopedId(id, lookupAnchorId);

	if (elementId)
		element = document.getElementById(elementId);

	const newState = {
		display: true,
		domNode: element,
		fromId: id,
		passthroughPrps
	};

	passthroughPrps.forEach(key => {
		const passthroughValue = state[key];

		if (passthroughValue !== undefined)
			newState[key] = passthroughValue;
	});

	setWgtState(open, newState);

	setState({ triggerOpenLookup: false });
};

//Export
export default onTriggerLookup;

//React
import React, { useEffect, useContext } from 'react';

//System
import { createContext } from 'opus-ui';

//Helpers
import onTriggerLookup from './onTriggerLookup';

//Context
const InputContext = createContext('input');

//Events
const onLookupResultsChanged = (
	{ id, setState, setWgtState, state: { lookupResults, lookupFlows } }
) => {
	if (!lookupResults)
		return;

	//Hacky: Instead of using setWgtState, we should try and find a way to do this with flows instead
	if (lookupResults.length === 1) {
		const record = lookupResults[0];

		lookupFlows.forEach(({ fromSubKey, to = id, toKey = 'value' }) => {
			setWgtState(to, { [toKey]: record[fromSubKey] });
		});
	} else if (!lookupResults.length) {
		lookupFlows.forEach(({ to = id, toKey = 'value' }) => {
			setWgtState(to, { deleteKeys: [toKey] });
		});
	}

	setState({
		loadLookupValue: false,
		deleteKeys: ['lookupResults']
	});
};

//Helpers
const buildDataLoaderFlows = ({ id, state: { lookupFilters = [], lookupAutoFilters = [] } }) => {
	const flows = [{
		fromKey: 'data',
		to: id,
		toKey: 'lookupResults',
		scope: `${id}-lookupLoader`
	}];

	[lookupFilters, lookupAutoFilters].forEach(list => {
		list.forEach(f => {
			const { from = id, fromKey, fromSubKey, key, operator = 'equals', ignoreEmptyString = true } = f;

			flows.push({
				from,
				fromKey,
				fromSubKey,
				to: `${id}-lookupLoader`,
				scope: `${id}-lookupLoader`,
				toKey: 'filters',
				ignoreEmptyString,
				mapObject: {
					key,
					operator,
					value: '((value))'
				}
			});
		});
	});

	return flows;
};

//Components
const LookupLoader = () => {
	const props = useContext(InputContext);
	const { id, ChildWgt, getHandler, state } = props;
	const { loadLookupValue, lookupResults, lookupDtaObj, lookupData, triggerOpenLookup } = state;

	useEffect(getHandler(onLookupResultsChanged), [lookupResults]);
	useEffect(getHandler(onTriggerLookup), [triggerOpenLookup]);

	const flows = buildDataLoaderFlows(props);

	if (!loadLookupValue)
		return null;

	return (
		<ChildWgt mda={{
			id,
			index: 'lookupLoader',
			type: 'dataLoader',
			prps: {
				dtaObj: lookupDtaObj,
				staticData: lookupData,
				flows
			}
		}} />
	);
};

//Exports
export default LookupLoader;

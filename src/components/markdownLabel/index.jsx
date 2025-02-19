//React
import React, { useMemo } from 'react';

//External Helpers
import { Popover, runScript } from '@intenda/opus-ui';

//Plugins
import ReactMarkdown from 'react-markdown';

//Styles
import './styles.css';

//Helpers
/* eslint-disable-next-line max-lines-per-function */
const buildMarkdownOverrides = (
	{ allowScriptAnchors, overrideStyles, assignIdsToHeadingTypes, allowAnchorAttributes }
) => {
	const res = {};

	if (allowScriptAnchors) {
		res.code = props => {
			const parsed = JSON.parse(props.children);
			const style = overrideStyles?.[parsed.style];

			const aProps = {
				onClick: () => runScript(parsed.script),
				style
			};
			if (parsed.attributes)
				Object.assign(aProps, parsed.attributes);

			return (
				<a {...aProps}>
					{parsed.cpt}
				</a>
			);
		};
	}

	if (allowAnchorAttributes) {
		res.a = props => {
			let parsed = props.children;

			try {
				parsed = JSON.parse(parsed);
			} catch (e) {}

			return (
				<a {...parsed.attributes} href={props.href}>
					{parsed.cpt ?? parsed}
				</a>
			);
		};
	}

	if (assignIdsToHeadingTypes) {
		assignIdsToHeadingTypes.forEach(t => {
			res[t] = props => {
				const Tag = props.node.tagName;
				const id = props.children.toLowerCase().replaceAll(' ', '-');

				return (
					<Tag id={id}>
						{props.children}
					</Tag>
				);
			};
		});
	}

	return res;
};

//Exports
export const MarkdownLabel = props => {
	const { id, classNames, style, attributes, state } = props;
	const { cpt, overrideStyles, assignIdsToHeadingTypes } = state;
	const { allowScriptAnchors, allowAnchorAttributes } = state;

	const builtOverrides = useMemo(() => {
		if (!allowScriptAnchors && !assignIdsToHeadingTypes)
			return;

		return buildMarkdownOverrides({
			allowScriptAnchors,
			overrideStyles,
			assignIdsToHeadingTypes,
			allowAnchorAttributes
		});
	}, [allowScriptAnchors, overrideStyles, assignIdsToHeadingTypes]);

	return (
		<div
			id={id}
			className={classNames}
			style={style}
			{...attributes}
		>
			<Popover props={props} />
			<ReactMarkdown components={builtOverrides}>{cpt}</ReactMarkdown>
		</div>
	);
};

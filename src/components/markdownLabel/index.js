//React
import React, { useMemo } from 'react';

//External Helpers
import { Popover, runScript } from 'opus-ui';

//Plugins
import ReactMarkdown from 'react-markdown';

//Styles
import './styles.css';

//Helpers
/* eslint-disable-next-line max-lines-per-function */
const buildMarkdownOverrides = (
	{ allowScriptAnchors, overrideStyles, assignIdsToHeadingTypes }
) => {
	const res = {};

	if (allowScriptAnchors) {
		res.code = props => {
			const parsed = JSON.parse(props.children[0]);
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

	if (assignIdsToHeadingTypes) {
		assignIdsToHeadingTypes.forEach(t => {
			res[t] = props => {
				const Tag = `h${props.level}`;
				const id = props.children[0].toLowerCase().replaceAll(' ', '-');

				return (
					<Tag id={id}>
						{props.children[0]}
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
	const { cpt, allowScriptAnchors, overrideStyles, assignIdsToHeadingTypes } = state;

	const builtOverrides = useMemo(() => {
		if (!allowScriptAnchors && !assignIdsToHeadingTypes)
			return;

		return buildMarkdownOverrides({
			allowScriptAnchors,
			overrideStyles,
			assignIdsToHeadingTypes
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

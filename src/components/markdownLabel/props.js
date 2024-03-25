/* eslint-disable max-len */

//Props
const props = {
	cpt: {
		type: 'string',
		desc: 'The markdown string to render'
	},
	allowScriptAnchors: {
		type: 'boolean',
		desc: 'When true, code tags will be converted to anchors that can be clicked. These need to be written as `{"cpt": "...", "styleName": "...", "script": {}, "attributes": {}}'
	},
	overrideStyles: {
		type: 'object',
		desc: 'A collection of styles that can be used by script anchors',
		spec: {
			styleName1: { color: 'blue' },
			styleName2: { cursor: 'pointer' }
		}
	},
	assignIdsToHeadingTypes: {
		type: 'array',
		spec: ['h1', 'h2'],
		desc: 'When set, specific heading tags will receive id\'s. If the heading equals "My Heading", the id will become: "my-heading"'
	}
};

export default props;


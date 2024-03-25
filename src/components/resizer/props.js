/* eslint-disable max-len */
const props = {
	isResizing: {
		type: 'boolean',
		desc: 'Indicates whether resizing is currently happening'
	},
	grabX: {
		type: 'integer',
		desc: 'The x position the mouse was at when resizing started'
	},
	x: {
		type: 'integer',
		desc: 'The current x position of the mouse'
	},
	y: {
		type: 'integer',
		desc: 'The current y position of the mouse'
	},
	dx: {
		type: 'integer',
		desc: 'The x delta. How far the user has already performed a resize action along the horizontal axis'
	},
	dy: {
		type: 'integer',
		desc: 'The y delta. How far the user has already performed a resize action along the vertical axis'
	}
};

export default props;

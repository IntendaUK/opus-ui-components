export const determineTransform = value => {
	let ratio = (value / 100) % 1;
	let rotation = 45 + ratio * 360;
	let transform = ' rotate(' + rotation + 'deg)';

	return transform;
};

//React
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/*
	Native signature pad. Replaces react-signature-canvas (which is UMD/CJS and pulled
	require('react') into the bundle). Implements only the surface opus-ui uses:
	  props:   penColor, minWidth, maxWidth, onEnd, canvasProps ({ className, style })
	  ref api: clear(), fromDataURL(dataUrl), toDataURL(type), isEmpty(), getCanvas()
	Strokes are smoothed with quadratic curves through segment mid-points and given a
	velocity-based variable width, matching the look of signature_pad closely enough.
*/

const VELOCITY_WEIGHT = 0.7;

const midPoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const SignaturePad = forwardRef((props, ref) => {
	const {
		penColor = 'black',
		minWidth = 0.5,
		maxWidth = 2.5,
		onEnd,
		canvasProps = {}
	} = props;

	const canvasRef = useRef(null);
	const ctxRef = useRef(null);
	const isDrawing = useRef(false);
	const strokes = useRef([]); // committed strokes: [{ color, points: [{ x, y, t }] }]
	const current = useRef(null); // in-progress stroke
	const bgImage = useRef(null); // optional background image (from fromDataURL)

	const ratio = () => Math.max(window.devicePixelRatio || 1, 1);

	const fitCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;

		const r = ratio();
		const rect = canvas.getBoundingClientRect();

		canvas.width = Math.max(1, Math.round(rect.width * r));
		canvas.height = Math.max(1, Math.round(rect.height * r));

		const ctx = canvas.getContext('2d');
		ctx.setTransform(r, 0, 0, r, 0, 0);
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		ctxRef.current = ctx;
	};

	const displaySize = () => {
		const canvas = canvasRef.current;
		const r = ratio();

		return { w: canvas.width / r, h: canvas.height / r };
	};

	const clearCanvas = () => {
		const ctx = ctxRef.current;
		const { w, h } = displaySize();

		ctx.clearRect(0, 0, w, h);
	};

	const strokeWidth = velocity => Math.max(maxWidth - velocity * (maxWidth - minWidth), minWidth);

	const drawSegment = (from, control, to, width, color) => {
		const ctx = ctxRef.current;

		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.quadraticCurveTo(control.x, control.y, to.x, to.y);
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.stroke();
	};

	const renderStroke = stroke => {
		const ctx = ctxRef.current;
		const pts = stroke.points;

		if (pts.length === 1) {
			const p = pts[0];

			ctx.beginPath();
			ctx.arc(p.x, p.y, (minWidth + maxWidth) / 4, 0, Math.PI * 2);
			ctx.fillStyle = stroke.color;
			ctx.fill();

			return;
		}

		let lastVel = 0;
		let lastW = (minWidth + maxWidth) / 2;
		let lastMid = pts[0];

		for (let i = 1; i < pts.length; i++) {
			const prev = pts[i - 1];
			const cur = pts[i];
			const dt = Math.max(cur.t - prev.t, 1);
			const v = distance(prev, cur) / dt;
			const vel = VELOCITY_WEIGHT * v + (1 - VELOCITY_WEIGHT) * lastVel;
			const w = strokeWidth(vel);
			const mid = midPoint(prev, cur);

			drawSegment(lastMid, prev, mid, (lastW + w) / 2, stroke.color);

			lastMid = mid;
			lastVel = vel;
			lastW = w;
		}
	};

	const renderAll = () => {
		if (!ctxRef.current)
			return;

		clearCanvas();

		if (bgImage.current) {
			const { w, h } = displaySize();

			ctxRef.current.drawImage(bgImage.current, 0, 0, w, h);
		}

		strokes.current.forEach(renderStroke);

		if (current.current)
			renderStroke(current.current);
	};

	const pointFromEvent = e => {
		const rect = canvasRef.current.getBoundingClientRect();

		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
			t: e.timeStamp || Date.now()
		};
	};

	const onPointerDown = e => {
		if (e.button !== undefined && e.button !== 0)
			return;

		isDrawing.current = true;
		current.current = { color: penColor, points: [pointFromEvent(e)] };

		renderAll();
	};

	const onPointerMove = e => {
		if (!isDrawing.current)
			return;

		current.current.points.push(pointFromEvent(e));

		renderAll();
	};

	const onPointerUp = () => {
		if (!isDrawing.current)
			return;

		isDrawing.current = false;
		strokes.current.push(current.current);
		current.current = null;

		renderAll();

		if (onEnd)
			onEnd();
	};

	useImperativeHandle(ref, () => ({
		clear: () => {
			strokes.current = [];
			current.current = null;
			bgImage.current = null;

			renderAll();
		},
		fromDataURL: dataUrl => {
			const img = new Image();

			img.onload = () => {
				bgImage.current = img;

				renderAll();
			};

			img.src = dataUrl;
		},
		toDataURL: type => canvasRef.current.toDataURL(type),
		isEmpty: () => strokes.current.length === 0 && !bgImage.current,
		getCanvas: () => canvasRef.current
	}));

	useEffect(() => {
		fitCanvas();
		renderAll();

		const onResize = () => {
			fitCanvas();
			renderAll();
		};

		window.addEventListener('resize', onResize);
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);

		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerup', onPointerUp);
		};
	}, []);

	const { style, ...restCanvasProps } = canvasProps;

	return (
		<canvas
			ref={canvasRef}
			onPointerDown={onPointerDown}
			style={{ touchAction: 'none', ...style }}
			{...restCanvasProps}
		/>
	);
});

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;

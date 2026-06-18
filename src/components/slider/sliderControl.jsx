//React
import React, { useEffect, useRef } from 'react';

/*
	Native single-thumb slider. Replaces rc-slider (its `es` build pulled require('react')
	into the bundle, and createSliderWithTooltip was removed in rc-slider v11 anyway).
	Keeps the rc-slider-* DOM/class names so the existing styles.css/theme keep working.
	Props used by opus-ui: min, max, step, value, vertical, onChange, onAfterChange, marks,
	plus tooltip / tooltipPlacement for the tooltip variant.
*/

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const snap = (value, min, max, step) => {
	if (!step || step <= 0)
		return clamp(value, min, max);

	const snapped = min + Math.round((value - min) / step) * step;

	return clamp(Number(snapped.toFixed(10)), min, max);
};

export const Slider = props => {
	const {
		min = 0,
		max = 100,
		step,
		value,
		vertical = false,
		marks = {},
		onChange,
		onAfterChange,
		tooltip = false,
		tooltipPlacement = 'top'
	} = props;

	const railRef = useRef(null);
	const dragging = useRef(false);

	const safeValue = clamp(typeof value === 'number' ? value : min, min, max);
	const pct = max === min ? 0 : ((safeValue - min) / (max - min)) * 100;

	const valueFromEvent = e => {
		const rail = railRef.current;
		const rect = rail.getBoundingClientRect();

		const ratio = vertical
			? 1 - (e.clientY - rect.top) / rect.height
			: (e.clientX - rect.left) / rect.width;

		return snap(min + clamp(ratio, 0, 1) * (max - min), min, max, step);
	};

	const emitChange = next => {
		if (next !== safeValue && onChange)
			onChange(next);
	};

	const onPointerDown = e => {
		if (e.button !== undefined && e.button !== 0)
			return;

		dragging.current = true;
		emitChange(valueFromEvent(e));

		e.preventDefault();
	};

	const onKeyDown = e => {
		let next = safeValue;
		const delta = step && step > 0 ? step : (max - min) / 100;

		if (e.key === 'ArrowLeft' || e.key === 'ArrowDown')
			next = snap(safeValue - delta, min, max, step);
		else if (e.key === 'ArrowRight' || e.key === 'ArrowUp')
			next = snap(safeValue + delta, min, max, step);
		else
			return;

		e.preventDefault();
		emitChange(next);

		if (onAfterChange)
			onAfterChange(next);
	};

	useEffect(() => {
		const onMove = e => {
			if (!dragging.current)
				return;

			emitChange(valueFromEvent(e));
		};

		const onUp = e => {
			if (!dragging.current)
				return;

			dragging.current = false;

			if (onAfterChange)
				onAfterChange(valueFromEvent(e));
		};

		window.addEventListener('pointermove', onMove);
		window.addEventListener('pointerup', onUp);

		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerup', onUp);
		};
	});

	const posStyle = p => (vertical ? { bottom: `${p}%` } : { left: `${p}%` });

	const trackStyle = vertical
		? { bottom: 0, height: `${pct}%` }
		: { left: 0, width: `${pct}%` };

	const markEntries = Object.keys(marks);

	return (
		<div
			className={`rc-slider${vertical ? ' rc-slider-vertical' : ''}`}
			onPointerDown={onPointerDown}
		>
			<div ref={railRef} className="rc-slider-rail" />
			<div className="rc-slider-track" style={trackStyle} />
			<div className="rc-slider-step">
				{markEntries.map(m => {
					const mp = max === min ? 0 : ((Number(m) - min) / (max - min)) * 100;
					const active = Number(m) <= safeValue;

					return (
						<span
							key={m}
							className={`rc-slider-dot${active ? ' rc-slider-dot-active' : ''}`}
							style={posStyle(mp)}
						/>
					);
				})}
			</div>
			<div
				className="rc-slider-handle"
				role="slider"
				tabIndex={0}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={safeValue}
				aria-orientation={vertical ? 'vertical' : 'horizontal'}
				style={posStyle(pct)}
				onKeyDown={onKeyDown}
			>
				{tooltip && (
					<div className={`rc-slider-tooltip rc-slider-tooltip-placement-${tooltipPlacement}`}>
						<div className="rc-slider-tooltip-inner">{safeValue}</div>
						<div className="rc-slider-tooltip-arrow" />
					</div>
				)}
			</div>
			{!!markEntries.length && (
				<div className="rc-slider-mark">
					{markEntries.map(m => {
						const mp = max === min ? 0 : ((Number(m) - min) / (max - min)) * 100;

						return (
							<span key={m} className="rc-slider-mark-text" style={posStyle(mp)}>
								{marks[m]}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Slider;

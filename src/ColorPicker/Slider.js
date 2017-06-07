import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import clamp from "./util/clamp";


export default class Slider extends React.Component {

	static propTypes = {
		value: PropTypes.number.isRequired,
		background : PropTypes.string
	};

	static defaultProps = {
		value : 0,
		background : '',
		className: null
	};

	constructor(props)
	{
		super();

		this._self = null;
		this.rect = null;
		this.onHandleUpdate = this.handleUpdate.bind(this);
		this.onStopUpdates = this.stopUpdates.bind(this);
	}

	getPosition(e)
	{
		if (e.touches)
		{
			e = e.touches[0];
		}
		return { x : e.clientX, y : e.clientY };
	}

	getPercentageValue(value)
	{
		const { props } = this;
		return `${(value / props.max) * 100}%`;
	}

	updatePosition(rect, clientX)
	{
		const { props } = this;
		props.onChange(this.getScaledValue((clientX - rect.left) / rect.width));
	}

	getScaledValue(value)
	{
		const { props } = this;
		return clamp(value, 0, 1) * props.max;
	}

	getCss()
	{
		const { props } = this;

		return {
			left: this.getPercentageValue(props.value)
		};
	}

	startUpdates(e)
	{
		e.preventDefault();

		document.addEventListener('mousemove', this.onHandleUpdate);
		document.addEventListener('touchmove', this.onHandleUpdate);
		document.addEventListener('mouseup', this.onStopUpdates);
		document.addEventListener('touchend', this.onStopUpdates);

		const { x, y } = this.getPosition(e);

		this._rect = this.getBoundingRect();
		this.setState({ active : true });
		this.updatePosition(this._rect, x, y);
	}

	getBoundingRect()
	{
		return ReactDOM.findDOMNode(this._self).getBoundingClientRect();
	}

	handleUpdate(e) {
		e.preventDefault();

		const { x, y } = this.getPosition(e);
		this.updatePosition(this._rect, x, y);
	}

	stopUpdates()
	{
		document.removeEventListener("mousemove", this.onHandleUpdate);
		document.removeEventListener("touchmove", this.onHandleUpdate);
		document.removeEventListener("mouseup", this.onStopUpdates);
		document.removeEventListener("touchend", this.onStopUpdates);

		this.setState({ active : false });
	}

	render()
	{
		const { props } = this;
		const background = props.background;

		return (
			<div
				ref={(r) => { this._self = r; }}
				className={classNames('slider', props.className)}
				onMouseDown={this.startUpdates.bind(this)}
				onTouchStart={this.startUpdates.bind(this)}>
				<div className="slider__track">
					<span style={{ background }} />
				</div>
				<div className="slider__pointer" style={this.getCss()} />
			</div>
		);
	}

}
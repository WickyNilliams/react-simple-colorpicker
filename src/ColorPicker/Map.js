import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import clamp from "./util/clamp";


export default class Map extends React.Component {

	static propTypes = {
		x : PropTypes.number.isRequired,
		y : PropTypes.number.isRequired,
		backgroundColor : PropTypes.string,
		className : PropTypes.string
	};

	static defaultProps = {
		x : 0,
		y : 0,
		backgroundColor : "transparent",
		className : null
	};

	constructor(props)
	{
		super();

		this.state = {
			active: false,
		};

		this._self = null;
		this._rect = null;
		this.onHandleUpdate = this._onHandleUpdate.bind(this);
		this.onStopUpdates = this._onStopUpdates.bind(this);
	}

	updatePosition(rect, clientX, clientY)
	{
		const { props } = this;
		const x = (clientX - rect.left) / rect.width;
		const y = (rect.bottom - clientY) / rect.height;

		props.onChange(
			this.getScaledValue(x),
			this.getScaledValue(y)
		);
	}

	getScaledValue(value)
	{
		const { props } = this;

		return clamp(value, 0, 1) * props.max;
	}

	getPercentageValue(value)
	{
		const { props } = this;
		return `${(value / props.max) * 100}%`;
	}

	getPosition(e)
	{
		if (e.touches)
		{
			e = e.touches[0];
		}
		return { x : e.clientX, y : e.clientY };
	}

	getBoundingRect()
	{
		return ReactDOM.findDOMNode(this._self).getBoundingClientRect();
	}

	_onStartUpdates(e)
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

	_onHandleUpdate(e) {
		e.preventDefault();

		const { x, y } = this.getPosition(e);
		this.updatePosition(this._rect, x, y);
	}

	_onStopUpdates()
	{
		document.removeEventListener("mousemove", this.onHandleUpdate);
		document.removeEventListener("touchmove", this.onHandleUpdate);
		document.removeEventListener("mouseup", this.onStopUpdates);
		document.removeEventListener("touchend", this.onStopUpdates);

		this.setState({ active : false });
	}

	render()
	{
		const { state, props } = this;

		return (
			<div
				ref={(r) => { this._self = r; }}
				onMouseDown={this._onStartUpdates.bind(this)}
				onTouchStart={this._onStartUpdates.bind(this)}
				className={classNames('map', props.className, { active : state.active })}>
				<div
					className="background"
					style={{
						backgroundColor: props.backgroundColor
					}}/>
				<div
					className="pointer"
					style={{
						left: this.getPercentageValue(this.props.x),
						bottom: this.getPercentageValue(this.props.y)
					}}/>
			</div>
		);
	}

}
import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as lib from "./lib";


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
		this.onHandleUpdate = this._onUpdate.bind(this);
		this.onStopUpdates = this._onStopUpdates.bind(this);
	}

	/**
	 * get position
	 *
	 * @param {Event} e
	 */
	getPosition(e)
	{
		if (e.touches)
		{
			e = e.touches[0];
		}
		return { x : e.clientX, y : e.clientY };
	}

	/**
	 * get percentage value
	 *
	 * @param {Number} value
	 * @return {String}
	 */
	getPercentageValue(value)
	{
		return `${(value / this.props.max) * 100}%`;
	}

	/**
	 * update position
	 *
	 * @param {ClientRect} rect
	 * @param {Number} clientX
	 */
	updatePosition(rect, clientX)
	{
		this.props.onChange(this.getScaledValue((clientX - rect.left) / rect.width));
	}

	/**
	 * get scaled value
	 *
	 * @param {Number} value
	 */
	getScaledValue(value)
	{
		return lib.util.clamp(value, 0, 1) * this.props.max;
	}

	/**
	 * get bounding rect
	 *
	 * @return {ClientRect}
	 */
	getBoundingRect()
	{
		return ReactDOM.findDOMNode(this._self).getBoundingClientRect();
	}

	/**
	 * on start updates
	 *
	 * @param {Event} e
	 */
	_onStartUpdates(e)
	{
		e.preventDefault();

		// set x,y position
		const { x } = this.getPosition(e);

		// set element
		this._rect = this.getBoundingRect();

		document.addEventListener('mousemove', this.onHandleUpdate);
		document.addEventListener('touchmove', this.onHandleUpdate);
		document.addEventListener('mouseup', this.onStopUpdates);
		document.addEventListener('touchend', this.onStopUpdates);

		this.setState({ active : true });
		this.updatePosition(this._rect, x);
	}

	/**
	 * on stop updates
	 */
	_onStopUpdates()
	{
		document.removeEventListener("mousemove", this.onHandleUpdate);
		document.removeEventListener("touchmove", this.onHandleUpdate);
		document.removeEventListener("mouseup", this.onStopUpdates);
		document.removeEventListener("touchend", this.onStopUpdates);

		this.setState({ active : false });
	}

	/**
	 * on update
	 *
	 * @param {Event} e
	 */
	_onUpdate(e) {
		e.preventDefault();

		const { x } = this.getPosition(e);
		this.updatePosition(this._rect, x);
	}

	render()
	{
		const { props } = this;

		return (
			<div
				ref={(r) => { this._self = r; }}
				className={classNames('slider', props.className)}
				onMouseDown={this._onStartUpdates.bind(this)}
				onTouchStart={this._onStartUpdates.bind(this)}>
				<div className="slider__track">
					<span style={{ background: props.background }} />
				</div>
				<div
					className="slider__pointer"
					style={{ left: this.getPercentageValue(this.props.value) }} />
			</div>
		);
	}

}
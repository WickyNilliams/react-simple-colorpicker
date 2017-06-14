import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as lib from "./lib";


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
		this.onHandleUpdate = this._onUpdate.bind(this);
		this.onStopUpdates = this._onStopUpdates.bind(this);
	}

	/**
	 * update position
	 *
	 * @param {ClientRect} rect
	 * @param {Number} clientX
	 * @param {Number} clientY
	 */
	updatePosition(rect, clientX, clientY)
	{
		const x = (clientX - rect.left) / rect.width;
		const y = (rect.bottom - clientY) / rect.height;

		this.props.onChange(
			this.getScaledValue(x),
			this.getScaledValue(y)
		);
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
		const { x, y } = this.getPosition(e);

		// set element
		this._rect = this.getBoundingRect();

		// set mouse|touch event
		document.addEventListener('mousemove', this.onHandleUpdate);
		document.addEventListener('touchmove', this.onHandleUpdate);
		document.addEventListener('mouseup', this.onStopUpdates);
		document.addEventListener('touchend', this.onStopUpdates);

		this.setState({ active : true });
		this.updatePosition(this._rect, x, y);
	}

	/**
	 * on stop updates
	 */
	_onStopUpdates()
	{
		// unset mouse|touch event
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

		const { x, y } = this.getPosition(e);
		this.updatePosition(this._rect, x, y);
	}

	render()
	{
		const { state, props } = this;

		return (
			<div
				ref={(r) => { this._self = r; }}
				onMouseDown={this._onStartUpdates.bind(this)}
				onTouchStart={this._onStartUpdates.bind(this)}
				className={classNames('cpMap', props.className, {
					'cpMap-active' : state.active
				})}>
				<div
					className="cpMap__background"
					style={{
						backgroundColor: props.backgroundColor
					}}/>
				<div
					className="cpMap__pointer"
					style={{
						left: this.getPercentageValue(this.props.x),
						bottom: this.getPercentageValue(this.props.y)
					}}/>
			</div>
		);
	}

}
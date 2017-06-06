import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Slider from "./Slider";
import Map from "./Map";

import * as ColorUtils from "./util/ColorUtils";


export default class ColorPicker extends React.Component {

	static propTypes = {
		color : PropTypes.string.isRequired,
		onChange : PropTypes.func.isRequired
	};

	static defaultProps = {
		color : "rgba(0,0,0,1)",
		opacitySlider : false
	};

	constructor(props)
	{
		super();

		this.state = {
			color : this.getStateFrom(props.color),
		};
	}

	componentWillReceiveProps(nextProps)
	{
		const { state } = this;
		const nextColor = this.getStateFrom(nextProps.color);

		if (!ColorUtils.equals(state.color, nextColor))
		{
			this.setState({ color: nextColor });
		}
	}

	getStateFrom(color)
	{
		return ColorUtils.parseToHsv(color);
	}

	getAlpha()
	{
		const { state } = this;
		return state.color[3] === undefined ? 1 : state.color[3];
	}

	getBackgroundGradient()
	{
		const { state } = this;
		const [h, s, v] = state.color;
		const opaque = ColorUtils.toRgbString([h, s, v, 1]);

		return `linear-gradient(to right, rgba(0,0,0,0) 0%, ${opaque} 100%)`;
	}

	getBackgroundHue()
	{
		const { state } = this;
		return ColorUtils.toRgbString([ state.color[0], 100, 100 ]);
	}

	handleAlphaChange(alpha)
	{
		const { state } = this;
		const [ h, s, v ] = state.color;
		this.update([ h, s, v, alpha ]);
	}

	handleHueChange(hue)
	{
		const { state } = this;
		const [ , s, v, a ] = state.color;
		this.update([ hue, s, v, a ]);
	}

	handleSaturationValueChange(saturation, value)
	{
		const { state } = this;
		const [ h, , , a ] = state.color;
		this.update([ h, saturation, value, a ]);
	}

	update(color)
	{
		const { props } = this;
		this.setState({ color : color });
		props.onChange(ColorUtils.toRgbString(color));
	}

	render()
	{
		const { state, props } = this;
		const [ hue, saturation, value ] = state.color;

		return (
			<div className={classNames('colorpicker', { 'with-opacity-slider' : props.opacitySlider })}>
				<Map
					x={saturation}
					y={value}
					max={100}
					className={ColorUtils.isDark(this.state.color) ? "dark" : "light"}
					backgroundColor={this.getBackgroundHue()}
					onChange={this.handleSaturationValueChange.bind(this)}/>
				<div className="controller">
					<Slider
						value={hue}
						max={360}
						onChange={this.handleHueChange.bind(this)}
						className="slider-hue"/>

					{props.opacitySlider && (
						<Slider
							value={this.getAlpha()}
							max={1}
							background={this.getBackgroundGradient()}
							onChange={this.handleAlphaChange.bind(this)}
							className="slider-opacity"/>
					)}
				</div>
			</div>
		);
	}

}
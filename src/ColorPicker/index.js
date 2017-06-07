import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Slider from "./Slider";
import Map from "./Map";
import Palette from './Palette';

import * as ColorUtils from "./util/ColorUtils";


export default class ColorPicker extends React.Component {

	static propTypes = {
		color : PropTypes.string.isRequired,
		onChange : PropTypes.func.isRequired
	};

	static defaultProps = {
		color: "rgba(0,0,0,1)",
		onChange: (color) => {},
		paletteColors: [
			[208, 2, 27, 1],
			'#F6A623',
			[248, 231, 28, 1],
			'#8B572A',
			'#7ED321',
			'#417505',
			'#BD0FE1',
			'#9012FE',
			'#4990E2',
			'#50E3C2',
			'#B8E986',
			'#000000',
			'#4A4A4A',
			'#9B9B9B',
			'#FFFFFF',
			'#B31F37'
		],
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
			<div className="colorpicker">
				<Map
					x={saturation}
					y={value}
					max={100}
					className={ColorUtils.isDark(this.state.color) ? "dark" : "light"}
					backgroundColor={this.getBackgroundHue()}
					onChange={this.handleSaturationValueChange.bind(this)}/>
				<div className="colorpicker__body">
					<nav className="colorpicker__controller">
						<Slider
							value={hue}
							max={360}
							onChange={this.handleHueChange.bind(this)}
							className="colorpicker__slider slider-hue"/>
						<Slider
							value={this.getAlpha()}
							max={1}
							background={this.getBackgroundGradient()}
							onChange={this.handleAlphaChange.bind(this)}
							className="colorpicker__slider slider-opacity"/>
					</nav>
					<figure className="colorpicker__preview">
						<span>
							<i style={{ backgroundColor: ColorUtils.toRgbString(state.color) }}/>
						</span>
					</figure>
				</div>
				<Palette colors={props.paletteColors} className="colorpicker__palette"/>
			</div>
		);
	}

}
import React from 'react';
import PropTypes from 'prop-types';

import Slider from "./Slider";
import Map from "./Map";
import Palette from './Palette';

import * as lib from "./lib";


export default class ColorPicker extends React.Component {

	static propTypes = {
		color : PropTypes.string.isRequired,
		onChange : PropTypes.func.isRequired
	};

	static defaultProps = {
		color: "rgba(0,0,0,1)",
		onChange: (color) => {},
		paletteColors: [
			'#D0011B',
			'#F6A623',
			'#F8E81C',
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
			color: lib.color.parseToHsv(props.color)
		};
	}

	componentWillReceiveProps(nextProps)
	{
		const { state } = this;
		const nextColor = lib.color.parseToHsv(nextProps.color);

		if (!lib.color.equals(state.color, nextColor))
		{
			this.setState({ color: nextColor });
		}
	}

	/**
	 * get alpha
	 *
	 * @return {Number}
	 */
	getAlpha()
	{
		const { state } = this;
		return state.color[3] === undefined ? 1 : state.color[3];
	}

	/**
	 * get background gradient
	 *
	 * @return {String}
	 */
	getBackgroundGradient()
	{
		const [ h, s, v ] = this.state.color;
		const opaque = lib.color.toRgbString([ h, s, v, 1 ]);
		return `linear-gradient(to right, rgba(0,0,0,0) 0%, ${opaque} 100%)`;
	}

	/**
	 * get background hue
	 *
	 * @return {String}
	 */
	getBackgroundHue()
	{
		return lib.color.toRgbString([ this.state.color[0], 100, 100 ]);
	}

	/**
	 * update
	 *
	 * @param {Array} c hue type color
	 */
	update(c)
	{
		const { props } = this;
		this.setState({ color : c });
		props.onChange(lib.color.toRgbString(c));
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
					className={lib.color.isDark(this.state.color) ? "dark" : "light"}
					backgroundColor={this.getBackgroundHue()}
					onChange={(saturation, value) => {
						const [ h, , , a ] = this.state.color;
						this.update([ h, saturation, value, a ]);
					}}/>
				<div className="colorpicker__body">
					<nav className="colorpicker__controller">
						<Slider
							value={hue}
							max={360}
							onChange={(hue) => {
								const [ , s, v, a ] = this.state.color;
								this.update([ hue, s, v, a ]);
							}}
							className="colorpicker__slider slider-hue"/>
						<Slider
							value={this.getAlpha()}
							max={1}
							background={this.getBackgroundGradient()}
							onChange={(alpha) => {
								const [ h, s, v ] = this.state.color;
								this.update([ h, s, v, alpha ]);
							}}
							className="colorpicker__slider slider-opacity"/>
					</nav>
					<figure className="colorpicker__preview">
						<span>
							<i style={{ backgroundColor: lib.color.toRgbString(state.color) }}/>
						</span>
					</figure>
				</div>
				<Palette
					colors={props.paletteColors}
					onSelectColor={(color) => {
						let [ h, saturation, value, a ] = lib.color.parseToHsv(color);
						this.update([ h, saturation, value, a ]);
					}}
					className="colorpicker__palette"/>
			</div>
		);
	}

}
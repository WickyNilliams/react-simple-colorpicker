import React from 'react';
import ReactDOM from 'react-dom';

import ColorSwatch from './ColorSwatch';
import ColorPicker from '../ColorPicker';
import './index.scss';


const colors = require('./colors.json');


class App extends React.Component {

	constructor()
	{
		super();

		this.state = {
			colors : colors,
			selected : 0
		};
	}

	_onClickItem(selected)
	{
		this.setState({ selected: selected });
	}

	handleColorChange(color)
	{
		const { state } = this;
		const colors = [ ...state.colors ];
		colors[state.selected] = color;
		this.setState({ colors });
	}

	render()
	{
		const { state } = this;
		const selectedColor = state.colors[state.selected];

		return (
			<div className="demo">
				<div className="demo__picker">
					<ColorPicker
						color={selectedColor}
						opacitySlider={true}
						onChange={this.handleColorChange.bind(this)}/>
				</div>

				<div className="demo__colors">
					<ColorSwatch
						colors={state.colors}
						selected={state.selected}
						onSelect={this._onClickItem.bind(this)}/>
				</div>
			</div>
		);
	}

}


ReactDOM.render(<App/>, document.getElementById('app'));
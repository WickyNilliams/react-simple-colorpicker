require("./app.scss");

import React from "react";
import createReactClass from 'create-react-class';
import ReactDOM from "react-dom";
import ColorPicker from "../../src/";
import ColorSwatch from "./ColorSwatch";
import colors from "./colors.json";


const App = createReactClass({

  getInitialState() {
    return {
      colors : colors,
      selected : 0
    };
  },

  render() {
    const selectedColor = this.state.colors[this.state.selected];

    return (
      <div>
        <div className="picker picker-left">
          <ColorSwatch
            colors={this.state.colors}
            selected={this.state.selected}
            onSelect={this.handleColorSelect}
          />
        </div>
        <div className="picker picker-right">
          <ColorPicker
            color={selectedColor}
            opacitySlider={true}
            onChange={this.handleColorChange}
          />
        </div>
      </div>
    );
  },

  handleColorSelect(selected) {
    this.setState({ selected });
  },

  handleColorChange(color) {
    const colors = [...this.state.colors];
    colors[this.state.selected] = color;
    this.setState({ colors });
  }

});

ReactDOM.render(<App />, document.querySelector("#app"));
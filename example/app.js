var React = require("react");
var ReactDOM = require("react-dom");
var ColorPicker = require("../lib/");
var ColorSwatch = require("./ColorSwatch");
var colors = require("./colors.json");


var App = React.createClass({

  getInitialState: function() {
    return {
      colors : colors,
      selected : 0
    };
  },

  render: function() {
    var selectedColor = this.state.colors[this.state.selected];

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

  handleColorSelect : function(i) {
    this.setState({ selected : i });
  },

  handleColorChange : function(color) {
    var colors = this.state.colors.slice();
    colors[this.state.selected] = color;
    this.setState({ colors : colors });
  }

});

ReactDOM.render(<App />, document.querySelector("#app"));
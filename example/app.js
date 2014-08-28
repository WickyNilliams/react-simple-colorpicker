/**
 * @jsx React.DOM
 */

var React = require("react");
var ColorPicker = require("../lib/");
var ColorSwatch = require("./ColorSwatch");
var colors = require("./colors.json");

function values(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
}


var App = React.createClass({

  getInitialState: function() {
    return {
      colors : values(colors),
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

React.initializeTouchEvents(true);
React.renderComponent(<App />, document.body);
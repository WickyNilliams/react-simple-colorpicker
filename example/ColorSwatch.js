/**
 * @jsx React.DOM
 */

var React = require("react");
var cx = require("react/lib/cx");
var Colr = require("colr");


var SwatchItem = React.createClass({

  render: function() {
    var color = this.props.color;
    var styles = { backgroundColor : color };
    var luminosity = Colr.fromHex(color).toGrayscale() / 255;

    var classes = cx({
      "swatch-item" : true,
      "swatch-selected" : this.props.selected,
      "swatch-dark": luminosity <= 0.5,
      "swatch-light": luminosity > 0.5
    });

    return (
      <button className={classes} style={styles} onClick={this.handleClick}>
        {color}
      </button>
    );
  },

  handleClick : function(e) {
    e.preventDefault();
    this.props.onClick(this.props.color);
  }

});


var ColorSwatch = React.createClass({

  getDefaultProps: function() {
    return {
      colors : [],
      selected : null
    };
  },

  render: function() {
    return (
      <div className="swatch">
        {this.props.colors.map(this.buildSwatch)}
      </div>
    );
  },

  buildSwatch : function(color, i) {
    return (
      <SwatchItem
        color={color}
        key={i}
        onClick={this.props.onSelect.bind(null, i)}
        selected={this.props.selected === i}
      />
    );
  }

});

module.exports = ColorSwatch;
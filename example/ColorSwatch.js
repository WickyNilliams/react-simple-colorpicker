var React = require("react");
var cx = require("react/lib/cx");
var tinycolor = require("tinycolor2");

var SwatchItem = React.createClass({

  render: function() {
    var color = tinycolor(this.props.color);
    var styles = { backgroundColor : color.toRgbString() };

    var classes = cx({
      "swatch-item" : true,
      "swatch-selected" : this.props.selected,
      "swatch-dark": color.isDark(),
      "swatch-light": color.isLight()
    });

    return (
      <button className={classes} style={styles} onClick={this.handleClick}>
        {color.toRgbString()}
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

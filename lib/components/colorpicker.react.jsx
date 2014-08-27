var React = require('react');
var Color = require('color');

var Map = require('./map.react');
var Slider = require('./slider.react');

var ColorPicker = React.createClass({

  getDefaultProps : function() {
    return {
      color : "#000000"
    };
  },

  getInitialState: function() {
    return this.getStateFrom(this.props.color);
  },

  componentWillReceiveProps: function(nextProps) {
    var state = this.getStateFrom(nextProps.color);

    if(state.color.hexString() !== this.state.color.hexString()) {
      this.setState(state);
    }
  },

  getStateFrom : function(color) {
    color = new Color(color);
    return {
      color : color,
      raw : this.getRawHsv(color)
    };
  },

  render: function () {
    var color = this.state.color;
    var rawHsv = this.state.raw;
    var luminosity = color.luminosity();
    var hue = this.toHue(color);

    var classes = React.addons.classSet({
      dark: luminosity <= 0.5,
      light: luminosity > 0.5
    });

    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={rawHsv.h}
            onChange={this.handleHueChange}
          />
        </div>
        <Map
          x={rawHsv.s}
          y={rawHsv.v}
          className={classes}
          backgroundColor={hue}
          onChange={this.handleSaturationValueChange} 
        />
      </div>
      /* jshint ignore: end */
    );
  },

  toHue : function(color) {
    return Color().hsv(color.hue(), 100, 100).hexString();
  },

  getRawHsv : function(color) {
    var hsv = color.hsv();
    return {
      h: hsv.h / 360,
      s: hsv.s / 100,
      v: hsv.v / 100
    };
  },

  handleHueChange : function(hue) {
    var color = this.state.color;
    var raw = this.state.raw;
    var oldColor = color.hexString();

    raw.h = hue;
    color.hue(hue * 360);

    this.setState(this.state);

    if(oldColor != color.hexString()) {
      this.props.onChange(this.state.color.hexString());
    }
  },

  handleSaturationValueChange : function(saturation, value) {
    var color = this.state.color;
    var raw = this.state.raw;
    var oldColor = color.hexString();

    color.saturationv(saturation * 100);
    color.value(value * 100);
    raw.s = saturation;
    raw.v = value;

    this.setState(this.state);

    if(oldColor != color.hexString()) {
      this.props.onChange(color.hexString());
    }
  },

});

module.exports = ColorPicker;

var React = require('react');
var Colr = require('colr');
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
    var nextColor = nextProps.color.toLowerCase();
    var currentColor = this.getColorFromRaw().toHex().toLowerCase();

    if(nextColor !== currentColor) {
      this.setState(this.getStateFrom(nextProps.color));
    }
  },

  getStateFrom : function(color) {
    color = Colr.fromHex(color);
    return {
      color : color,
      raw : this.getRawHsv(color)
    };
  },

  render: function () {
    var rawHsv = this.state.raw;
    var luminosity = this.getLuminosity();
    var hue = this.getBackgroundHue();

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

  getLuminosity : function() {
    return this.state.color.toGrayscale() / 255;
  },

  getBackgroundHue : function() {
    return Colr.fromHsv(this.state.raw.h * 360, 100, 100).toHex();
  },

  getRawHsv : function(color) {
    var hsv = color.toHsvObject();
    return {
      h: hsv.h / 360,
      s: hsv.s / 100,
      v: hsv.v / 100
    };
  },

  getColorFromRaw : function() {
    var raw = this.state.raw;
    return Colr.fromHsv(raw.h * 360, raw.s * 100, raw.v * 100);
  },

  handleHueChange : function(hue) {
    this.state.raw.h = hue;
    this.update();
  },

  handleSaturationValueChange : function(saturation, value) {
    this.state.raw.s = saturation;
    this.state.raw.v = value;
    this.update();
  },

  update : function() {
    var color = this.getColorFromRaw()
    this.props.onChange(color.toHex());
    this.setState({ color : color });
  }

});

module.exports = ColorPicker;

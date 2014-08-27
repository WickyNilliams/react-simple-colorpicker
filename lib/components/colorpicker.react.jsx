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
      this.setState(this.getStateFrom(nextColor));
    }
  },

  getStateFrom : function(color) {
    color = Colr.fromHex(color);
    return {
      hsv : color.toHsvObject()
    };
  },

  render: function () {
    var hsv = this.state.hsv;
    var luminosity = this.getLuminosity();
    var hue = this.getBackgroundHue();

    var classes = React.addons.classSet({
      dark: luminosity <= 0.5,
      light: luminosity > 0.5
    });

    return (
      <div className="colorpicker">
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={hsv.h}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>
        <Map
          x={hsv.s}
          y={hsv.v}
          max={100}
          className={classes}
          backgroundColor={hue}
          onChange={this.handleSaturationValueChange}
        />
      </div>
    );
  },

  getLuminosity : function() {
    return this.getColorFromRaw().toGrayscale() / 255;
  },

  getBackgroundHue : function() {
    return Colr.fromHsv(this.state.hsv.h, 100, 100).toHex();
  },

  getColorFromRaw : function() {
    var hsv = this.state.hsv;
    return Colr.fromHsv(hsv.h, hsv.s, hsv.v);
  },

  handleHueChange : function(hue) {
    this.state.hsv.h = hue;
    this.update();
  },

  handleSaturationValueChange : function(saturation, value) {
    this.state.hsv.s = saturation;
    this.state.hsv.v = value;
    this.update();
  },

  update : function() {
    var color = this.getColorFromRaw()
    this.props.onChange(color.toHex());
  }

});

module.exports = ColorPicker;

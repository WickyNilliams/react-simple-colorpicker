var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var Map = require("./Map");
var Slider = require("./Slider");
var conj = require("../util/conj");
var ColorUtils = require("../util/ColorUtils");

var ColorPicker = React.createClass({

  mixins : [PureRenderMixin],

  propTypes: {
    color : React.PropTypes.string.isRequired,
    onChange : React.PropTypes.func.isRequired
  },

  getDefaultProps : function() {
    return {
      color : "rgba(0,0,0,1)",
      opacitySlider : false
    };
  },

  getInitialState: function() {
    return this.getStateFrom(this.props.color);
  },

  componentWillReceiveProps: function(nextProps) {
    if (!ColorUtils.equals(this.state.color, nextProps.color)) {
      this.setState(this.getStateFrom(nextProps.color));
    }
  },

  getStateFrom : function(color) {
    return {
      color : ColorUtils.toHsvObject(color)
    };
  },

  render: function () {
    var hueColor = this.getBackgroundHue();
    var alpha = this.getAlpha();
    var isDark = ColorUtils.isDark(this.state.color);

    var colorPickerClasses = cx({
      "colorpicker" : true,
      "with-opacity-slider" : this.props.opacitySlider
    });

    var mapClasses = cx({
      dark: isDark,
      light: !isDark
    });

    if (this.props.opacitySlider) {
      var opacitySlider = (
        <div className="opacity-slider">
          <Slider
            vertical={false}
            value={this.getAlpha()}
            max={1}
            background={this.getBackgroundGradient()}
            onChange={this.handleAlphaChange}
          />
        </div>
      );
    }

    return (
      <div className={colorPickerClasses}>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.color.h}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>
        {opacitySlider}
        <Map
          x={this.state.color.s}
          y={this.state.color.v}
          max={1}
          className={mapClasses}
          backgroundColor={hueColor}
          onChange={this.handleSaturationValueChange}
        />
      </div>
    );
  },

  getAlpha : function() {
    return this.state.color.a === undefined ? 1 : this.state.color.a;
  },

  getBackgroundGradient: function() {
    var from = conj(this.state.color, { a : 0 });
    var to   = conj(this.state.color, { a : 1 });

    return (
      "linear-gradient(to right, " +
      ColorUtils.toRgbString(from) + " 0%, " +
      ColorUtils.toRgbString(to) + " 100%)"
    );
  },

  getBackgroundHue : function() {
    return ColorUtils.toRgbString({ h: this.state.color.h, s: 1, v: 1 });
  },

  handleAlphaChange : function(alpha) {
    this.update({ a : alpha });
  },

  handleHueChange : function(hue) {
    this.update({ h : hue });
  },

  handleSaturationValueChange : function(saturation, value) {
    this.update({ s : saturation, v : value });
  },

  update : function(hsv) {
    var color = conj(this.state.color, hsv);
    this.props.onChange(ColorUtils.toRgbString(color));
    this.setState({ color : color });
  }

});

module.exports = ColorPicker;

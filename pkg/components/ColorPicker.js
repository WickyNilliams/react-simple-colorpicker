/**
 * @jsx React.DOM
 */

var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var Map = require("./Map");
var Slider = require("./Slider");
var tinycolor = require("tinycolor2");
var extend = require("../util/extend");

var ColorPicker = React.createClass({displayName: "ColorPicker",

  mixins : [PureRenderMixin],

  getDefaultProps : function() {
    return {
      color : "rgba(0,0,0,1)"
    };
  },

  getInitialState: function() {
    var color = tinycolor(this.props.color);
    return this.getStateFrom(color);
  },

  componentWillReceiveProps: function(nextProps) {
    var nextColor = tinycolor(nextProps.color);

    if (nextColor.toRgbString() !== this.state.color.toRgbString()) {
      this.setState(this.getStateFrom(nextColor));
    }
  },

  getStateFrom : function(color) {
    return {
      color : color
    };
  },

  render: function () {
    var hueColor = this.getBackgroundHue();

    var classes = cx({
      dark: this.state.color.isDark(),
      light: this.state.color.isLight()
    });

    return (
      React.createElement("div", {className: "colorpicker"}, 
        React.createElement("div", {className: "hue-slider"}, 
          React.createElement(Slider, {
            vertical: true, 
            value: this.state.color.toHsv().h, 
            max: 360, 
            onChange: this.handleHueChange}
          )
        ), 
        React.createElement("div", {className: "opacity-slider"}, 
          React.createElement(Slider, {
            vertical: false, 
            value: this.state.color.getAlpha(), 
            max: 1, 
            gradientColor: this.state.color.toRgb(), 
            onChange: this.handleAlphaChange}
          )
        ), 
        React.createElement(Map, {
          x: this.state.color.toHsv().s * 100, 
          y: this.state.color.toHsv().v * 100, 
          max: 100, 
          className: classes, 
          backgroundColor: hueColor, 
          onChange: this.handleSaturationValueChange}
        )
      )
    );
  },

  getBackgroundHue : function() {
    return tinycolor.fromRatio({ h: this.state.color.toHsv().h, s: 100, v: 100}).toHexString();
  },

  handleAlphaChange : function(alpha) {
    this.update({
      a : alpha
    });
  },

  handleHueChange : function(hue) {
    this.update({
      h : hue
    });
  },

  handleSaturationValueChange : function(saturation, value) {
    this.update({
      s : saturation,
      v : value
    });
  },

  update : function(hsv) {
    var color = tinycolor.fromRatio(extend(this.state.color.toHsv(), hsv));
    this.props.onChange(color.toRgbString());
    this.setState({ color : color });
  }

});

module.exports = ColorPicker;

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

var ColorPicker = React.createClass({

  mixins : [PureRenderMixin],

  getDefaultProps : function() {
    return {
      color : "#000000"
    };
  },

  getInitialState: function() {
    var color = tinycolor(this.props.color);
    return this.getStateFrom(color);
  },

  componentWillReceiveProps: function(nextProps) {
    var nextColor = tinycolor(nextProps.color);

    if (!nextColor.toRgbString() === this.state.color.toRgbString()) {
      this.setState(this.getStateFrom(nextColor));
    }
  },

  getStateFrom : function(color) {
    return {
      color : color
    };
  },

  render: function () {
    var luminosity = this.getLuminosity();
    var hue = this.getBackgroundHue();

    var classes = cx({
      dark: luminosity <= 0.5,
      light: luminosity > 0.5
    });

    return (
      <div className="colorpicker">
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.color.toHsv().h}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>
        <Map
          x={this.state.color.toHsv().s * 100}
          y={this.state.color.toHsv().v * 100}
          max={100}
          className={classes}
          backgroundColor={hue}
          onChange={this.handleSaturationValueChange}
        />
      </div>
    );
  },

  getLuminosity : function() {
    return Colr.fromHsvObject(this.state.hsv).toGrayscale() / 255;
  },

  getBackgroundHue : function() {
    return Colr.fromHsv(this.state.hsv.h, 100, 100).toHex();
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

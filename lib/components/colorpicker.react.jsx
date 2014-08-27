var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var Colr = require("colr");
var Map = require("./map.react");
var Slider = require("./slider.react");


var ColorPicker = React.createClass({

  mixins : [PureRenderMixin],

  getDefaultProps : function() {
    return {
      color : "#000000"
    };
  },

  getInitialState: function() {
    return this.getStateFrom(this.props.color);
  },

  componentWillReceiveProps: function(nextProps) {
    var nextColor = nextProps.color;
    var currentColor = Colr.fromHsvObject(this.state.hsv).toHex();

    if(nextColor.toLowerCase() !== currentColor.toLowerCase()) {
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
            value={this.state.hsv.h}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>
        <Map
          x={this.state.hsv.s}
          y={this.state.hsv.v}
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
      h : hue,
      s : this.state.hsv.s,
      v : this.state.hsv.v
    });
  },

  handleSaturationValueChange : function(saturation, value) {
    this.update({
      h : this.state.hsv.h,
      s : saturation,
      v : value
    });
  },

  update : function(hsv) {
    var color = Colr.fromHsvObject(hsv);
    this.props.onChange(color.toHex());
    this.setState({ hsv : hsv });
  }

});

module.exports = ColorPicker;

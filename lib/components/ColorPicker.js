var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var Map = require("./Map");
var Slider = require("./Slider");
var tinycolor = require("tinycolor2");
var extend = require("../util/extend");

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

    var colorPickerClasses = cx({
      "colorpicker" : true,
      "with-opacity-slider" : this.props.opacitySlider
    });

    var mapClasses = cx({
      dark: this.state.color.isDark(),
      light: this.state.color.isLight()
    });

    if (this.props.opacitySlider === true) {
      var opacitySlider = <div className="opacity-slider">
          <Slider
            vertical={false}
            value={this.state.color.getAlpha()}
            max={1}
            gradientColor={this.state.color.toRgb()}
            onChange={this.handleAlphaChange}
          />
        </div>;
    }

    return (
      <div className={colorPickerClasses}>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.color.toHsv().h}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>
        {opacitySlider}
        <Map
          x={this.state.color.toHsv().s * 100}
          y={this.state.color.toHsv().v * 100}
          max={100}
          className={mapClasses}
          backgroundColor={hueColor}
          onChange={this.handleSaturationValueChange}
        />
      </div>
    );
  },

  getBackgroundHue : function() {
    return tinycolor({ h: this.state.color.toHsv().h, s: 100, v: 100}).toHexString();
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
    var color = tinycolor(extend(this.state.color.toHsv(), hsv));
    this.props.onChange(color.toRgbString());
    this.setState({ color : color });
  }

});

module.exports = ColorPicker;

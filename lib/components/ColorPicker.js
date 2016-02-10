var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("classnames");
var Map = require("./Map");
var Slider = require("./Slider");
var ColorUtils = require("../util/ColorUtils");

var ColorPicker = React.createClass({

  mixins : [PureRenderMixin],

  propTypes: {
    color : React.PropTypes.string.isRequired,
    onChange : React.PropTypes.func.isRequired,
    onFinish : React.PropTypes.func
  },

  getDefaultProps : function() {
    return {
      color : "rgba(0,0,0,1)",
      opacitySlider : false
    };
  },

  getInitialState: function() {
    return this.getStateFrom(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    var nextState = this.getStateFrom(nextProps);

    if (!ColorUtils.equals(this.state.color, nextState.color)) {
      this.setState(nextState);
    }
  },

  getStateFrom : function(props) {
    return {
      color : ColorUtils.parseToHsv(props.color)
    };
  },

  render: function () {
    var classes = cx("colorpicker", { "with-opacity-slider" : this.props.opacitySlider });

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
      <div className={classes}>
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={this.state.color[0]}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>
        {opacitySlider}
        <Map
          x={this.state.color[1]}
          y={this.state.color[2]}
          max={100}
          className={ColorUtils.isDark(this.state.color) ? "dark" : "light"}
          backgroundColor={this.getBackgroundHue()}
          onChange={this.handleSaturationValueChange}
        />
      </div>
    );
  },

  getAlpha : function() {
    return this.state.color[3] === undefined ? 1 : this.state.color[3];
  },

  getBackgroundGradient: function() {
    var c = this.state.color;

    return (
      "linear-gradient(to right, " +
      ColorUtils.toRgbString([c[0], c[1], c[2], 0]) + " 0%, " +
      ColorUtils.toRgbString([c[0], c[1], c[2], 1]) + " 100%)"
    );
  },

  getBackgroundHue : function() {
    return ColorUtils.toRgbString([this.state.color[0], 100, 100]);
  },

  handleAlphaChange : function(alpha, isFinished) {
    var c = this.state.color;
    this.update([c[0], c[1], c[2], alpha], isFinished);
  },

  handleHueChange : function(hue, isFinished) {
    var c = this.state.color;
    this.update([hue, c[1], c[2], c[3]], isFinished);
  },

  handleSaturationValueChange : function(saturation, value, isFinished) {
    var c = this.state.color;
    this.update([c[0], saturation, value, c[3]], isFinished);
  },

  update : function(color, isFinished) {
    this.setState({ color : color });
    this.props.onChange(ColorUtils.toRgbString(color));

    if (isFinished && this.props.onFinish)
      this.props.onFinish(ColorUtils.toRgbString(color));
  }

});

module.exports = ColorPicker;

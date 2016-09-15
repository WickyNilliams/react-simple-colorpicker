import React from "react";
import PureRenderMixin from "react/lib/ReactComponentWithPureRenderMixin";
import cx from "classnames";
import Map from "./Map";
import Slider from "./Slider";
import * as ColorUtils from "../util/ColorUtils";

const ColorPicker = React.createClass({

  mixins : [PureRenderMixin],

  propTypes: {
    color : React.PropTypes.string.isRequired,
    onChange : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      color : "rgba(0,0,0,1)",
      opacitySlider : false
    };
  },

  getInitialState() {
    const initialState = this.getStateFrom(this.props);
    initialState.value = ColorUtils.parseToRgb(this.props.color);
    return initialState;
  },

  componentWillReceiveProps(nextProps) {
    const nextState = this.getStateFrom(nextProps);

    if (!ColorUtils.equals(this.state.color, nextState.color)) {
      this.setState(nextState);
    }
  },

  getStateFrom(props) {
    return {
      color : ColorUtils.parseToHsv(props.color),
    };
  },

  render() {
    const classes = cx("colorpicker", { "with-opacity-slider" : this.props.opacitySlider });
    const [hue, saturation, value] = this.state.color;

    return (
      <div className={classes}>

        <div className="hue-slider">
          <Slider
            vertical={true}
            value={hue}
            max={360}
            onChange={this.handleHueChange}
          />
        </div>

        {this.props.opacitySlider && (
          <div className="opacity-slider">
            <Slider
              vertical={false}
              value={this.getAlpha()}
              max={1}
              background={this.getBackgroundGradient()}
              onChange={this.handleAlphaChange}
            />
          </div>
        )}

        <Map
          x={saturation}
          y={value}
          max={100}
          className={ColorUtils.isDark(this.state.color) ? "dark" : "light"}
          backgroundColor={this.getBackgroundHue()}
          onChange={this.handleSaturationValueChange}
        />

        <div className="direct-color-input">
          <div className="direct-color-input-label_start">
            {this.props.opacitySlider ? 'rgba(' : 'rgb('}
          </div>
          <input
            type="text"
            inputMode="text"
            className="direct-color-input-input"
            value={this.state.value}
            onChange={this.handleDirectChange}
          />
          <div className="direct-color-input-label_end">)</div>
        </div>

      </div>
    );
  },

  getAlpha() {
    return this.state.color[3] === undefined ? 1 : this.state.color[3];
  },

  getBackgroundGradient() {
    const [h, s, v] = this.state.color;
    const opaque = ColorUtils.toRgbString([h, s, v, 1]);

    return `linear-gradient(to right, rgba(0,0,0,0) 0%, ${opaque} 100%)`;
  },

  getBackgroundHue() {
    return ColorUtils.toRgbString([this.state.color[0], 100, 100]);
  },

  handleDirectChange({ target: { value } }) {
    const color = ColorUtils.parseToHsv(`rgba(${value})`);
    const complete = color.filter(c => !isNaN(c)).length === 4;

    if (complete) {
      this.setState({ value, color });
      this.props.onChange(ColorUtils.toRgbString(color));
    } else {
      this.setState({ value });
    }
  },

  handleAlphaChange(alpha) {
    const [h, s, v] = this.state.color;
    this.update([h, s, v, alpha]);
  },

  handleHueChange(hue) {
    const [, s, v, a] = this.state.color;
    this.update([hue, s, v, a]);
  },

  handleSaturationValueChange(saturation, value) {
    const [h, , , a] = this.state.color;
    this.update([h, saturation, value, a]);
  },

  update(color) {
    this.setState({ color });
    this.props.onChange(ColorUtils.toRgbString(color));
  }

});

export default ColorPicker;

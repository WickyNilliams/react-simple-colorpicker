"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsPureRenderMixin = require("react-addons-pure-render-mixin");

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Map = require("./Map");

var _Map2 = _interopRequireDefault(_Map);

var _Slider = require("./Slider");

var _Slider2 = _interopRequireDefault(_Slider);

var _ColorUtils = require("../util/ColorUtils");

var ColorUtils = _interopRequireWildcard(_ColorUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPicker = (0, _createReactClass2.default)({
  displayName: "ColorPicker",


  mixins: [_reactAddonsPureRenderMixin2.default],

  propTypes: {
    color: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: "rgba(0,0,0,1)",
      opacitySlider: false
    };
  },
  getInitialState: function getInitialState() {
    return this.getStateFrom(this.props);
  },
  getDerivedStateFromProps: function getDerivedStateFromProps(nextProps, prevState) {
    var nextColor = lib.color.parseToHsv(nextProps.color);
    if (!lib.color.equals(prevState.color, nextColor)) {
      return {
        color: nextColor
      };
    }
    return null;
  },
  getStateFrom: function getStateFrom(props) {
    return {
      color: ColorUtils.parseToHsv(props.color)
    };
  },
  render: function render() {
    var classes = (0, _classnames2.default)("colorpicker", { "with-opacity-slider": this.props.opacitySlider });

    var _state$color = _slicedToArray(this.state.color, 3),
        hue = _state$color[0],
        saturation = _state$color[1],
        value = _state$color[2];

    return _react2.default.createElement(
      "div",
      { className: classes },
      _react2.default.createElement(
        "div",
        { className: "hue-slider" },
        _react2.default.createElement(_Slider2.default, {
          vertical: true,
          value: hue,
          max: 360,
          onChange: this.handleHueChange
        })
      ),
      this.props.opacitySlider && _react2.default.createElement(
        "div",
        { className: "opacity-slider" },
        _react2.default.createElement(_Slider2.default, {
          vertical: false,
          value: this.getAlpha(),
          max: 1,
          background: this.getBackgroundGradient(),
          onChange: this.handleAlphaChange
        })
      ),
      _react2.default.createElement(_Map2.default, {
        x: saturation,
        y: value,
        max: 100,
        className: ColorUtils.isDark(this.state.color) ? "dark" : "light",
        backgroundColor: this.getBackgroundHue(),
        onChange: this.handleSaturationValueChange
      })
    );
  },
  getAlpha: function getAlpha() {
    return this.state.color[3] === undefined ? 1 : this.state.color[3];
  },
  getBackgroundGradient: function getBackgroundGradient() {
    var _state$color2 = _slicedToArray(this.state.color, 3),
        h = _state$color2[0],
        s = _state$color2[1],
        v = _state$color2[2];

    var opaque = ColorUtils.toRgbString([h, s, v, 1]);

    return "linear-gradient(to right, rgba(0,0,0,0) 0%, " + opaque + " 100%)";
  },
  getBackgroundHue: function getBackgroundHue() {
    return ColorUtils.toRgbString([this.state.color[0], 100, 100]);
  },
  handleAlphaChange: function handleAlphaChange(alpha) {
    var _state$color3 = _slicedToArray(this.state.color, 3),
        h = _state$color3[0],
        s = _state$color3[1],
        v = _state$color3[2];

    this.update([h, s, v, alpha]);
  },
  handleHueChange: function handleHueChange(hue) {
    var _state$color4 = _slicedToArray(this.state.color, 4),
        s = _state$color4[1],
        v = _state$color4[2],
        a = _state$color4[3];

    this.update([hue, s, v, a]);
  },
  handleSaturationValueChange: function handleSaturationValueChange(saturation, value) {
    var _state$color5 = _slicedToArray(this.state.color, 4),
        h = _state$color5[0],
        a = _state$color5[3];

    this.update([h, saturation, value, a]);
  },
  update: function update(color) {
    this.setState({ color: color });
    this.props.onChange(ColorUtils.toRgbString(color));
  }
});

exports.default = ColorPicker;
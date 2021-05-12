"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _DraggableMixin = require("./DraggableMixin");

var _DraggableMixin2 = _interopRequireDefault(_DraggableMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slider = (0, _createReactClass2.default)({
  displayName: "Slider",


  mixins: [_DraggableMixin2.default, _reactAddonsPureRenderMixin2.default],

  propTypes: {
    value: _propTypes2.default.number.isRequired,
    vertical: _propTypes2.default.bool,
    background: _propTypes2.default.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: 0,
      vertical: false,
      background: ""
    };
  },
  updatePosition: function updatePosition(rect, clientX, clientY) {
    var value = void 0;

    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    this.props.onChange(this.getScaledValue(value));
  },
  getCss: function getCss() {
    var attr = this.props.vertical ? "bottom" : "left";

    return _defineProperty({}, attr, this.getPercentageValue(this.props.value));
  },
  render: function render() {
    var classes = (0, _classnames2.default)("slider", this.props.vertical ? "vertical" : "horizontal");
    var background = this.props.background;

    return _react2.default.createElement(
      "div",
      {
        className: classes,
        onMouseDown: this.startUpdates,
        onTouchStart: this.startUpdates
      },
      _react2.default.createElement("div", { className: "track", style: { background: background } }),
      _react2.default.createElement("div", { className: "pointer", style: this.getCss() })
    );
  }
});

exports.default = Slider;
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

var Map = (0, _createReactClass2.default)({
  displayName: "Map",


  mixins: [_DraggableMixin2.default, _reactAddonsPureRenderMixin2.default],

  propTypes: {
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    backgroundColor: _propTypes2.default.string,
    className: _propTypes2.default.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      x: 0,
      y: 0,
      backgroundColor: "transparent",
      className: ""
    };
  },
  updatePosition: function updatePosition(rect, clientX, clientY) {
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    this.props.onChange(this.getScaledValue(x), this.getScaledValue(y));
  },
  render: function render() {
    var classes = (0, _classnames2.default)("map", this.props.className, { active: this.state.active });
    var backgroundColor = this.props.backgroundColor;

    return _react2.default.createElement(
      "div",
      {
        className: classes,
        onMouseDown: this.startUpdates,
        onTouchStart: this.startUpdates
      },
      _react2.default.createElement("div", { className: "background", style: { backgroundColor: backgroundColor } }),
      _react2.default.createElement("div", { className: "pointer", style: {
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        } })
    );
  }
});

exports.default = Map;
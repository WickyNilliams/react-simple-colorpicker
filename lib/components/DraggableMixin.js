"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clamp = require("../util/clamp");

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}
var getDocument = function getDocument(element) {
  return element.ownerDocument;
};

var DraggableMixin = {

  propTypes: {
    onChange: _propTypes2.default.func.isRequired,
    max: _propTypes2.default.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: noop,
      max: 1
    };
  },
  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.document = getDocument(_reactDom2.default.findDOMNode(this));
    this.rect = this.getBoundingRect();
  },
  startUpdates: function startUpdates(e) {
    var document = this.document;


    document.addEventListener("mousemove", this.handleUpdate);
    document.addEventListener("touchmove", this.handleUpdate);
    document.addEventListener("mouseup", this.stopUpdates);
    document.addEventListener("touchend", this.stopUpdates);

    e.preventDefault();

    var _getPosition = this.getPosition(e),
        x = _getPosition.x,
        y = _getPosition.y;

    this.rect = this.getBoundingRect();
    this.setState({ active: true });
    this.updatePosition(this.rect, x, y);
  },
  handleUpdate: function handleUpdate(e) {
    e.preventDefault();

    var _getPosition2 = this.getPosition(e),
        x = _getPosition2.x,
        y = _getPosition2.y;

    this.updatePosition(this.rect, x, y);
  },
  stopUpdates: function stopUpdates() {
    var document = this.document;


    document.removeEventListener("mousemove", this.handleUpdate);
    document.removeEventListener("touchmove", this.handleUpdate);
    document.removeEventListener("mouseup", this.stopUpdates);
    document.removeEventListener("touchend", this.stopUpdates);

    this.setState({ active: false });
  },
  getPosition: function getPosition(e) {
    if (e.touches) {
      e = e.touches[0];
    }

    return {
      x: e.clientX,
      y: e.clientY
    };
  },
  getPercentageValue: function getPercentageValue(value) {
    return value / this.props.max * 100 + "%";
  },
  getScaledValue: function getScaledValue(value) {
    return (0, _clamp2.default)(value, 0, 1) * this.props.max;
  },
  getBoundingRect: function getBoundingRect() {
    return _reactDom2.default.findDOMNode(this).getBoundingClientRect();
  }
};

exports.default = DraggableMixin;
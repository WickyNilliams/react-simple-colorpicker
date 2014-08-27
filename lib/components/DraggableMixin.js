var React = require("react");
var clamp = require("../util/clamp");

function noop() {}

var DraggableMixin = {

  propTypes: {
    onChange : React.PropTypes.func,
    max : React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      onChange: noop,
      max : 1
    };
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  componentDidMount: function() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  },

  componentWillUnmount: function() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  },

  handleMouseDown: function (e) {
    this.setState({ active: true });
    this.updatePosition(e.clientX, e.clientY);
  },

  handleMouseMove: function (e) {
    if (this.state.active) {
      this.updatePosition(e.clientX, e.clientY);
    }
  },

  handleMouseUp: function () {
    if(this.state.active) {
      this.setState({ active: false });
    }
  },

  getPercentageValue : function(value) {
    return (value / this.props.max) * 100 + '%';
  },

  getScaledValue : function(value) {
    return clamp(value, 0, 1) * this.props.max;
  }

};

module.exports = DraggableMixin;
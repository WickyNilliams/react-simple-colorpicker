var React = require("react");
var ReactDOM = require("react-dom");
var clamp = require("../util/clamp");

function noop() {}

var DraggableMixin = {

  propTypes: {
    onChange : React.PropTypes.func.isRequired,
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
    document.addEventListener("mousemove", this.handleUpdate);
    document.addEventListener("touchmove", this.handleUpdate);
    document.addEventListener("mouseup", this.stopUpdates);
    document.addEventListener("touchend", this.stopUpdates);
  },

  componentWillUnmount: function() {
    document.removeEventListener("mousemove", this.handleUpdate);
    document.removeEventListener("touchmove", this.handleUpdate);
    document.removeEventListener("mouseup", this.stopUpdates);
    document.removeEventListener("touchend", this.stopUpdates);
  },

  startUpdates: function (e) {
    e.preventDefault();
    var coords = this.getPosition(e);
    this.setState({ active: true });
    this.updatePosition(coords.x, coords.y);
  },

  handleUpdate: function (e) {
    if (this.state.active) {
      e.preventDefault();
      var coords = this.getPosition(e);
      this.updatePosition(coords.x, coords.y);
    }
  },

  stopUpdates: function (e) {
    if(this.state.active) {
      e.preventDefault();
      this.setState({ active: false });
      var coords = this.getPosition(e);
      this.updatePosition(coords.x, coords.y, true);
    }
  },

  getPosition : function(e) {
    if(e.touches) {
      e = e.touches[0];
    }

    return {
      x : e.clientX,
      y : e.clientY
    };
  },

  getBoundingRect : function() {
    return ReactDOM.findDOMNode(this).getBoundingClientRect();
  },

  getPercentageValue : function(value) {
    return (value / this.props.max) * 100 + "%";
  },

  getScaledValue : function(value) {
    return clamp(value, 0, 1) * this.props.max;
  }

};

module.exports = DraggableMixin;

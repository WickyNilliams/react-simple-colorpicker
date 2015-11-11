import React from "react";
import ReactDOM from "react-dom";
import clamp from "../util/clamp";

function noop() {}

const DraggableMixin = {

  propTypes: {
    onChange : React.PropTypes.func.isRequired,
    max : React.PropTypes.number
  },

  getDefaultProps() {
    return {
      onChange: noop,
      max : 1
    };
  },

  getInitialState() {
    return {
      active: false
    };
  },

  componentDidMount() {
    document.addEventListener("mousemove", this.handleUpdate);
    document.addEventListener("touchmove", this.handleUpdate);
    document.addEventListener("mouseup", this.stopUpdates);
    document.addEventListener("touchend", this.stopUpdates);
  },

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.handleUpdate);
    document.removeEventListener("touchmove", this.handleUpdate);
    document.removeEventListener("mouseup", this.stopUpdates);
    document.removeEventListener("touchend", this.stopUpdates);
  },

  startUpdates(e) {
    e.preventDefault();
    const { x, y } = this.getPosition(e);
    this.setState({ active : true });
    this.updatePosition(x, y);
  },

  handleUpdate(e) {
    if (this.state.active) {
      e.preventDefault();
      const { x, y } = this.getPosition(e);
      this.updatePosition(x, y);
    }
  },

  stopUpdates() {
    if(this.state.active) {
      this.setState({ active : false });
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

export default DraggableMixin;

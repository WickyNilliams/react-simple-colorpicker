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
    window.addEventListener("resize", this.updateBoundingRect);
    window.addEventListener("scroll", this.updateBoundingRect);

    this.updateBoundingRect();
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateBoundingRect);
    window.removeEventListener("scroll", this.updateBoundingRect);
  },

  startUpdates(e) {
    document.addEventListener("mousemove", this.handleUpdate);
    document.addEventListener("touchmove", this.handleUpdate);
    document.addEventListener("mouseup", this.stopUpdates);
    document.addEventListener("touchend", this.stopUpdates);

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
      document.removeEventListener("mousemove", this.handleUpdate);
      document.removeEventListener("touchmove", this.handleUpdate);
      document.removeEventListener("mouseup", this.stopUpdates);
      document.removeEventListener("touchend", this.stopUpdates);

      this.setState({ active : false });
    }
  },

  getPosition(e) {
    if(e.touches) {
      e = e.touches[0];
    }

    return {
      x : e.clientX,
      y : e.clientY
    };
  },

  getPercentageValue(value) {
    return (value / this.props.max) * 100 + "%";
  },

  getScaledValue(value) {
    return clamp(value, 0, 1) * this.props.max;
  },

  updateBoundingRect() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({ rect });
  }

};

export default DraggableMixin;

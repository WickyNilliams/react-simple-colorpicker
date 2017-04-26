import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import clamp from "../util/clamp";

function noop() {}
const getDocument = element => element.ownerDocument;

const DraggableMixin = {

  propTypes: {
    onChange : PropTypes.func.isRequired,
    max : PropTypes.number
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
    this.document = getDocument(ReactDOM.findDOMNode(this));
    this.rect = this.getBoundingRect();
  },

  startUpdates(e) {
    const { document } = this;

    document.addEventListener("mousemove", this.handleUpdate);
    document.addEventListener("touchmove", this.handleUpdate);
    document.addEventListener("mouseup", this.stopUpdates);
    document.addEventListener("touchend", this.stopUpdates);

    e.preventDefault();
    const { x, y } = this.getPosition(e);

    this.rect = this.getBoundingRect();
    this.setState({ active : true });
    this.updatePosition(this.rect, x, y);
  },

  handleUpdate(e) {
    e.preventDefault();
    const { x, y } = this.getPosition(e);
    this.updatePosition(this.rect, x, y);
  },

  stopUpdates() {
    const { document } = this;

    document.removeEventListener("mousemove", this.handleUpdate);
    document.removeEventListener("touchmove", this.handleUpdate);
    document.removeEventListener("mouseup", this.stopUpdates);
    document.removeEventListener("touchend", this.stopUpdates);

    this.setState({ active : false });
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

  getBoundingRect() {
    return ReactDOM.findDOMNode(this).getBoundingClientRect();
  }

};

export default DraggableMixin;

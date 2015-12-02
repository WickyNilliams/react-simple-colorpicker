import React from "react";
import PureRenderMixin from "react/lib/ReactComponentWithPureRenderMixin";
import cx from "classnames";
import DraggableMixin from "./DraggableMixin";


const Map = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    x : React.PropTypes.number.isRequired,
    y : React.PropTypes.number.isRequired,
    backgroundColor : React.PropTypes.string,
    className : React.PropTypes.string
  },

  getDefaultProps() {
    return {
      x : 0,
      y : 0,
      backgroundColor : "transparent",
      className : ""
    };
  },

  updatePosition(clientX, clientY) {
    const { rect } = this.state;

    const x = (clientX - rect.left) / rect.width;
    const y = (rect.bottom - clientY) / rect.height;

    this.props.onChange(
      this.getScaledValue(x),
      this.getScaledValue(y)
    );
  },

  render() {
    const classes = cx("map", this.props.className, { active : this.state.active });
    const backgroundColor = this.props.backgroundColor;

    return (
      <div
        className={classes}
        onMouseDown={this.startUpdates}
        onTouchStart={this.startUpdates}
      >
        <div className="background" style={{ backgroundColor }} />
        {this.state.rect && (
          <div className="pointer" style={{
            left: this.getPercentageValue(this.props.x),
            bottom: this.getPercentageValue(this.props.y)
          }} />
        )}
      </div>
    );
  }

});

export default Map;

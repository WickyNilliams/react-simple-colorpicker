import React from "react";
import cx from "classnames";
import PureRenderMixin from "react/lib/ReactComponentWithPureRenderMixin";

const SwatchItem = React.createClass({

  mixins : [PureRenderMixin],

  render() {
    const classes = cx("swatch-item", { "swatch-selected" : this.props.selected });
    const backgroundColor = this.props.color;

    return (
      <button 
        className={classes}
        style={{ backgroundColor }}
        onClick={this.handleClick}
      />
    );
  },

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.id);
  }

});


const ColorSwatch = React.createClass({

  mixins : [PureRenderMixin],

  getDefaultProps() {
    return {
      colors : [],
      selected : null
    };
  },

  render() {
    return (
      <div className="swatch">
        {this.props.colors.map(this.buildSwatch)}
      </div>
    );
  },

  buildSwatch(color, i) {
    return (
      <SwatchItem
        color={color}
        key={i}
        id={i}
        onClick={this.props.onSelect}
        selected={this.props.selected === i}
      />
    );
  }

});

export default ColorSwatch;

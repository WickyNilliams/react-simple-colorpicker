var React = require("react");
var cx = require("classnames");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");

var SwatchItem = React.createClass({

  mixins : [PureRenderMixin],

  render: function() {
    var classes = cx("swatch-item", { "swatch-selected" : this.props.selected });

    return (
      <button 
        className={classes}
        style={{ backgroundColor : this.props.color }}
        onClick={this.handleClick}
      />
    );
  },

  handleClick : function(e) {
    e.preventDefault();
    this.props.onClick(this.props.id);
  }

});


var ColorSwatch = React.createClass({

  mixins : [PureRenderMixin],

  getDefaultProps: function() {
    return {
      colors : [],
      selected : null
    };
  },

  render: function() {
    return (
      <div className="swatch">
        {this.props.colors.map(this.buildSwatch)}
      </div>
    );
  },

  buildSwatch : function(color, i) {
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

module.exports = ColorSwatch;

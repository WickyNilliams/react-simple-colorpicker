/**
 * @jsx React.DOM
 */

var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var DraggableMixin = require("./DraggableMixin");


var Map = React.createClass({displayName: "Map",

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    x : React.PropTypes.number,
    y : React.PropTypes.number,
    backgroundColor : React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      x : 0,
      y : 0,
      backgroundColor : "transparent"
    };
  },

  updatePosition : function(clientX, clientY) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = this.getScaledValue(x);
    y = this.getScaledValue(y);

    this.props.onChange(x, y);
  },

  render: function () {
    var classes = cx({
      map: true,
      active: this.state.active
    });

    return (
      React.createElement("div", {
        className: this.props.className + " " + classes, 
        onMouseDown: this.startUpdates, 
        onTouchStart: this.startUpdates
      }, 
        React.createElement("div", {className: "background", style: {
          backgroundColor: this.props.backgroundColor
        }}), 
        React.createElement("div", {className: "pointer", style: {
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        }})
      )
    );
  }

});

module.exports = Map;

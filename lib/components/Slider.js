/**
 * @jsx React.DOM
 */

var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var DraggableMixin = require("./DraggableMixin");


var Slider = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    vertical: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      value : 0
    };
  },

  updatePosition : function(clientX, clientY) {
    var rect = this.getDOMNode().getBoundingClientRect();

    var value;
    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    value = this.getScaledValue(value);
    this.props.onChange(value);
  },

  getCss: function () {
    var obj = {};
    var attr = this.props.vertical ? "bottom" : "left";
    obj[attr] = this.getPercentageValue(this.props.value);
    return obj;
  },

  render: function () {
    var classes = cx({
      slider: true,
      vertical: this.props.vertical,
      horizontal: ! this.props.vertical
    });

    return (
      <div
        className={classes}
        onMouseDown={this.startUpdates}
        onTouchStart={this.startUpdates}
      >
        <div className="track" />
        <div className="pointer" style={this.getCss()} />
      </div>
    );
  }

});

module.exports = Slider;

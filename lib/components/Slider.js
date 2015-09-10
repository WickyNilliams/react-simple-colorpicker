var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("react/lib/cx");
var DraggableMixin = require("./DraggableMixin");
var tinycolor = require("tinycolor2");


var Slider = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    value: React.PropTypes.number.isRequired,
    vertical: React.PropTypes.bool
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

  getGradientCss: function () {
    if (this.props.gradientColor) {
      var color = tinycolor(this.props.gradientColor);
      var obj = {
        background: "linear-gradient(to right, " +
          color.setAlpha(0).toRgbString() + " 0%, " +
          color.setAlpha(1).toRgbString() + " 100%)"
        };
      return obj;
    }
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
        <div className="track" style={this.getGradientCss()} />
        <div className="pointer" style={this.getCss()} />
      </div>
    );
  }

});

module.exports = Slider;

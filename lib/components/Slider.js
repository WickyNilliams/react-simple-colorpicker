var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("classnames");
var DraggableMixin = require("./DraggableMixin");


var Slider = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    value: React.PropTypes.number.isRequired,
    vertical: React.PropTypes.bool,
    background : React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      value : 0,
      background : ""
    };
  },

  updatePosition : function(clientX, clientY) {
    var rect = this.getBoundingRect();
    var value;

    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    this.props.onChange(
      this.getScaledValue(value)
    );
  },

  getCss: function () {
    var obj = {};
    var attr = this.props.vertical ? "bottom" : "left";
    obj[attr] = this.getPercentageValue(this.props.value);
    return obj;
  },

  render: function () {
    var classes = cx("slider", (this.props.vertical ? "vertical" : "horizontal"));
    
    return (
      <div
        className={classes}
        onMouseDown={this.startUpdates}
        onTouchStart={this.startUpdates}
      >
        <div className="track" style={{ background : this.props.background }} />
        <div className="pointer" style={this.getCss()} />
      </div>
    );
  }

});

module.exports = Slider;

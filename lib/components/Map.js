var React = require("react");
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var cx = require("classnames");
var DraggableMixin = require("./DraggableMixin");


var Map = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    x : React.PropTypes.number.isRequired,
    y : React.PropTypes.number.isRequired,
    backgroundColor : React.PropTypes.string,
    className : React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      x : 0,
      y : 0,
      backgroundColor : "transparent"
    };
  },

  updatePosition : function(clientX, clientY) {
    var rect = this.getBoundingRect();

    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    this.props.onChange(
      this.getScaledValue(x),
      this.getScaledValue(y)
    );
  },

  render: function () {
    var classes = cx("map", this.props.className, { active : this.state.active });

    return (
      <div
        className={classes}
        onMouseDown={this.startUpdates}
        onTouchStart={this.startUpdates}
      >
        <div className="background" style={{
          backgroundColor: this.props.backgroundColor
        }} />
        <div className="pointer" style={{
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        }} />
      </div>
    );
  }

});

module.exports = Map;

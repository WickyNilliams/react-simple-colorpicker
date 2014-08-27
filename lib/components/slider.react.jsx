var React = require('react/addons');
var clamp = require('../util/clamp');
var DraggableMixin = require("./DraggableMixin");


var Slider = React.createClass({

  mixins : [DraggableMixin],

  getDefaultProps: function() {
    return {
      value : 0,
      max : 1
    };
  },

  propTypes: {
    vertical: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number.isRequired
  },

  updatePosition : function(clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();

    var value;
    if (this.props.vertical) {
      value = (rect.bottom - clientY) / rect.height;
    } else {
      value = (clientX - rect.left) / rect.width;
    }

    value = clamp(value, 0, 1) * this.props.max;
    this.props.onChange(value);
  },

  getCss: function () {
    var obj = {};
    var attr = this.props.vertical ? 'bottom' : 'left';
    obj[attr] = (this.props.value / this.props.max) * 100 + '%';
    return obj;
  },

  render: function () {
    var classes = React.addons.classSet({
      slider: true,
      vertical: this.props.vertical,
      horizontal: ! this.props.vertical
    });

    return (
      <div className={classes} onMouseDown={this.handleMouseDown}>
        <div className="track" />
        <div className="pointer" style={this.getCss()} />
      </div>
    );
  }

});

module.exports = Slider;

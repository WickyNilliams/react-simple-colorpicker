var React = require('react/addons');
var DraggableMixin = require("./DraggableMixin");
var clamp = require("../util/clamp");


var Map = React.createClass({

  getDefaultProps: function() {
    return {
      x : 0,
      y : 0,
      backgroundColor : "transparent"
    };
  },

  mixins : [DraggableMixin],

  updatePosition : function(clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = clamp(x, 0, 1);
    y = clamp(y, 0, 1);

    this.props.onChange(x, y);
  },

  render: function () {
    var classes = React.addons.classSet({
      map: true,
      active: this.state.active
    });

    return (
      <div className={this.props.className + " " + classes} onMouseDown={this.handleMouseDown}>
        <div className="background" style={{
          backgroundColor: this.props.backgroundColor
        }} />
        <div className="pointer" style={{
          left: (this.props.x * 100) + '%',
          bottom: (this.props.y * 100) + '%'
        }} />
      </div>
    );
  }

});

module.exports = Map;

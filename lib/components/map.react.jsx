var React = require('react/addons');

var store = require('../store');
var actions = require('../actions');

function clamp(val, min, max){
  return val < min? min : (val > max? max : val);
}

var Map = React.createClass({

  getInitialState: function () {
    return {
      active: false
    };
  },

  handleMouseDown: function (e) {
    this.setState({ active : true });
    this.updateHueValue(e.clientX, e.clientY);
  },

  handleMouseMove: function (e) {
    if (this.state.active) {
      this.updateHueValue(e.clientX, e.clientY);
    }
  },

  handleMouseUp: function () {
    this.setState({ active : false });
  },

  updateHueValue : function(clientX, clientY) {
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = clamp(x, 0, 1);
    y = clamp(y, 0, 1);

    actions.setSaturation(x);
    actions.setValue(y);
  },

  render: function () {
    var rawHsv = store.toRawHsv();
    var lightness = store.toLum();

    var classes = React.addons.classSet({
      map: true,
      dark: lightness <= 0.5,
      light: lightness > 0.5,
      active: this.state.active
    });

    return (
      <div
        className={classes}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <div className="background" style={{
          backgroundColor: store.toHue()
        }} />
        <div className="pointer" style={{
          top: (100 - rawHsv.v * 100) + '%',
          left: rawHsv.s * 100 + '%'
        }} />
      </div>
    );
  }

});

module.exports = Map;

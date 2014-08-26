var React = require('react');
var Reflux = require('reflux');

var store = require('../store');
var actions = require('../actions');

var Map = require('./map.react');
var Slider = require('./slider.react');

var ColorPicker = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(store, this.onChange);
  },

  onChange: function () {
    this.forceUpdate();
  },

  render: function () {
    var rawHsv = store.toRawHsv();
    var luminosity = store.toLum();

    var classes = React.addons.classSet({
      dark: luminosity <= 0.5,
      light: luminosity > 0.5
    });

    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={rawHsv.h}
            onChange={this.handleHueChange}
          />
        </div>
        <Map
          x={rawHsv.s}
          y={rawHsv.v}
          className={classes}
          backgroundColor={store.toHue()}
          onChange={this.handleSaturationValueChange} 
        />
      </div>
      /* jshint ignore: end */
    );
  },

  handleHueChange : function(hue) {
    actions.setHue(hue);
  },

  handleSaturationValueChange : function(saturation, value) {
    actions.setSaturation(saturation);
    actions.setValue(value);
  },

});

module.exports = ColorPicker;

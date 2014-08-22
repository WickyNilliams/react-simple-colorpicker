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

    return (
      /* jshint ignore: start */
      <div className="colorpicker">
        <div className="hue-slider">
          <Slider
            vertical={true}
            value={rawHsv.h}
            onChange={actions.setHue}
          />
        </div>
        <Map />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = ColorPicker;

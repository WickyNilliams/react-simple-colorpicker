# React-Simple-ColorPicker

> A simple(r) colorpicker written using React.

A fork of [react-colorpicker](https://github.com/stayradiated/react-colorpicker), but with the extra stuff removed.

## Install

```bash
npm install react-simple-colorpicker --save
```

## Usage

```javascript
var React = require('react');
var ColorPicker = require('react-simple-colorpicker');

var App = React.createClass({

  getInitialState: function() {
    return {
      color : this.props.initialColor
    };
  },

  render: function() {
    return (
      <ColorPicker color={this.state.color} onChange={this.handleChange} opacitySlider={true} />
    );
  },

  handleChange : function(color) {
    console.log(color); // color is rgb(a) string
    this.setState({ color : color });
  }

});

React.render(<App initialColor="rgb(0,0,0,1)" />, document.body);
```


# React-Simple-ColorPicker

> A simple(r) colorpicker written using React.

A fork of [react-colorpicker](https://github.com/stayradiated/react-colorpicker), but with the extra stuff removed.

## Why?

* Improved performance
* Smaller file size (only 3.8kb gzipped)
* Easily composed into more complex color pickers (e.g. see [example/src](example directory))
* Bug fixes


## Install

Via npm:

```bash
npm install react-simple-colorpicker --save
yarn add https://github.com/RedgooseDev/react-simple-colorpicker
```


## Usage

### javascript

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'react-simple-colorpicker';

class App extends React.Component {

	constructor(props) {
		super();

		this.state = {
			color : props.initialColor
		};
	}

	render() {
		return (
			<ColorPicker
				color={this.state.color}
				onChange={(color) => this.setState({ color: color })}
				//paletteColors={[]}
			/>
		);
	}
}

ReactDOM.render(<App initialColor="#ffffff" />, document.querySelector("#app"));
```

### scss

```scss

```


## Changelog

### v1.5.0

* Design and code refactoring
* Add color Palette
* Support v1.5.x higher react version

### v1.4.1

* Improve performance
* Fix dragging inside elements with `overflow: scroll` (fixes #17)

### v1.4.0

* Upgrade to react v15

### v1.3.0

* `react` and `react-dom` now peer dependencies (fixes #9)
* Performance improvements
* Will now work if rendered into an iframe from another document
* Switch to webpack
* Add release script

### v1.2.0

* Compatibility with react v0.14

### v1.1.2

* Drop `classSet` in favour of `classnames` module
* Switch out tinycolor2 for pure-color
* Improved example

### v1.1.1

* Fix issue with extreme saturation values caused by tinycolor2
* Better propTypes
* Some internal code cleanup

### v1.1.0 (deprecated)

* Add option for alpha slider
* React v0.13 compatibility

### v1.0.1

* Fix broken dependencies

### v1.0.0 (deprecated)

* React v0.11 compatibility

### v0.5.0

* Small tweaks

### v0.1.0

* Forked @stayradiated's [react-colorpicker](https://github.com/stayradiated/react-colorpicker)
* Remove extraneous functionality
* Drop reflux
* Fix a few bugs
* Add touch support
* Some simple perf wins with PureRenderMixin
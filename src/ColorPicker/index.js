import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class ColorPicker extends React.Component {

	static propTypes = {
		color : PropTypes.string.isRequired,
		onChange : PropTypes.func.isRequired
	};

	static defaultProps = {
		color : "rgba(0,0,0,1)",
		opacitySlider : false
	};

	constructor(props)
	{
		super();

		this.state = {

		};
	}

	componentWillReceiveProps(nextProps)
	{

	}

	render()
	{
		const { state, props } = this;

		return (
			<div>ColorPicker component</div>
		);
	}
}
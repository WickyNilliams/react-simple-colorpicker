import React from 'react';
import classNames from 'classnames';


export default class Palette extends React.Component {

	static defaultProps = {
		colors: [],
		className: null,
	};

	renderItem(o, k)
	{
		console.log(o);
		return null;
	}

	render()
	{
		const { props } = this;

		return (
			<nav className={classNames('palette', props.className)}>
				<ul>
					{props.colors.map(this.renderItem.bind(this))}
				</ul>
			</nav>
		);
	}

}
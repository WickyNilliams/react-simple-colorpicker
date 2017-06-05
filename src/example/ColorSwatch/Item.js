import React from "react";
import classNames from "classnames";


export default class Item extends React.Component {

	static defaultProps = {
		selected: false,
		onClick: (id) => {},
		id: null,
	};

	_onClick(e)
	{
		e.preventDefault();
		const { props } = this;

		props.onClick(props.id);
	}

	render()
	{
		const { props } = this;

		return (
			<button
				className={classNames('swatch-item', { 'swatch-selected' : props.selected })}
				style={{ backgroundColor: props.color }}
				onClick={this._onClick.bind(this)}/>
		);
	}

}
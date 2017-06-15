import React from "react";
import classNames from "classnames";

import Item from './Item';


export default class ColorSwatch extends React.Component {

	static defaultProps = {
		colors: [],
		selected: null,
		onSelect: () => {}
	};

	render()
	{
		const { props } = this;

		return (
			<div className="swatch">
				{props.colors.map((color, i) => {
					return (
						<Item
							key={i}
							color={color}
							id={i}
							onClick={props.onSelect}
							selected={props.selected === i}/>
					);
				})}
			</div>
		);
	}

}
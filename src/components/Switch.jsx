import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	getButtons: function () {
		return this.props.buttons || [];
	},
	isSelected: function (button) {
		return this.props.selected === button;
	},
	getStyle: function (isSelected) {
		if (isSelected) {
			return {"backgroundColor": "rgb(80, 80, 256)"};
		} else {
			return {"backgroundColor": "rgb(200, 200, 200)"};
		}
	},
	render: function () {
		return (
			<div className = "selection-menu">
				{ this.getButtons().map (
					button => <button key = {button} onClick = {() => this.props.switchLabel(button)} style = {this.getStyle(this.isSelected(button))} className = {(this.isSelected ? "selected" : "not-selected")}><h1>{button}</h1>
				</button>)
				}
			</div>
			);
	}
});
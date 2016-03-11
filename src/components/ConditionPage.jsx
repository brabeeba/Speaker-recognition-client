import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	getCondition: function () {
		return ["Condition B", "Condition C"]
	},
	render: function() {
		return (
			<div>
				<p>Research team to complete before participants are in small group rooms</p>
				{ 
					this.getCondition().map (
					button => <button key = {button} onClick = {() => {this.props.selectCondition(button); this.props.setTime(60); this.props.nextPage();}}><h1>{button}</h1>
				</button>)
				}

			</div>
			);
	}
});
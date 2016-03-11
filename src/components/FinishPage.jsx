import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function () {
		return (
			<div>
			<h1>Thank you for participating<br/>Please return to the main computer lab</h1>
			<button onClick = {() => this.props.finishMeeting(this.props.groupid)}><h1>Start Over</h1></button>
			</div>
		);
	}
})
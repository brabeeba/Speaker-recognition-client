import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	getParticipants: function () {
		return this.props.participants || []
	},

	render: function () {
		return (
			<div>
				<h1>Task 1 Introduction</h1>
				<h2>Research Team to Explain Task 1 </h2>
				<p>Recorded so far:</p>
				<ol>{this.getParticipants().map((participant, index) => <li key = {"participant-" + String(index)}>{participant}</li>)}</ol>
				<button onClick = {() => {this.props.nextPage(); this.props.setTime(600); this.props.openMeetingHandle(this.props.groupid, this.props.condition, "Meeting 1");}}><h1>Go to Meeting 1</h1></button>
				<button onClick = {() => this.props.startOver(this.props.groupid)}><h1>Start Over</h1></button>
			</div>
			);
	}
})
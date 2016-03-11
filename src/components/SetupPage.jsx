import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],

	isRecording: function () {
		return this.props.isRecording || false
	},
	getParticipants: function () {
		return this.props.participants || []
	},
	timeExist: function () {
		return !!this.props.setupTimer
	},
	getTime: function () {
		const time = this.props.setupTimer
		const hour = Math.floor(time / 3600)
		const minute = Math.floor((time - 3600 * hour) / 60)
		const second = time - 3600 * hour - 60 * minute
		return (hour === 0 ? `${minute}:${second}` : `${hour}:${minute}:${second}`)
	},
	render: function () {
		return (
			<div>
				<h1>Setup</h1>
				<form id = "setupForm" onSubmit = {(e) => {
					e.preventDefault();
					if (this.props.isRecording) {
						this.props.stop(this.props.isRecording);
						clearInterval(this.interval);
					} else {
						this.props.record(this.props.isRecording, this.refs.setupName.value, this.refs.setupGroupId.value, this.refs.setupId.value);
						this.interval = setInterval(() => {
							this.props.countDown();
							if(this.timeExist() && this.props.setupTimer <= 0) {
								this.props.stop(this.props.isRecording);
								clearInterval(this.interval);
							}
						}, 1000);
					}
					

				}}>
					Name: <input type = "text" name = "Name" ref = "setupName" />
					Participant ID: <input type = "text" name = "Participant-ID" ref = "setupId"/>
					
					Group ID: <input type = "text" name = "Group-ID" ref = "setupGroupId"/>
					<input type = "submit" value = {this.isRecording() ? "Stop" : "Record"} />
				</form>
				{this.timeExist() ? <h2>Timer: {this.getTime()}</h2> : <div></div>}
				<p>One at a time, please read the text provided for 60 seconds</p>
				<p>If you are not reading, please remain silent</p>
				<p>Recorded so far:</p> 
				<ol>
				{this.getParticipants().map((participant, index) => <li key = {"participant-" + String(index)}>{participant}</li>)}
				</ol>
				<button  onClick = {() => {
					if (this.getParticipants().size > 0) {
						this.props.completeSetup(this.props.groupid);
						this.props.stop(this.props.isRecording);
						this.props.nextPage(); 
						clearInterval(this.interval);

					}
					}}><h1>Complete</h1></button>
				<button  onClick = {() => {this.props.startOver(this.props.groupid); clearInterval(this.interval);}}><h1>Start Over</h1></button>
				


			</div>

			);
	}
});
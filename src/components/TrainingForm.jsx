import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	isRecording: function () {
		return this.props.isRecording || false
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
			<form id = "nameForm" onSubmit = {(e) => {
				e.preventDefault();
				if (this.props.isRecording) {
					this.props.stop();
				} 
				this.props.record(this.props.isRecording, this.refs.name.value);


			}}>
				Name: <input type = "text" name = "Name" ref = "name" />
				<input type = "submit" value = {this.isRecording() ? "Stop" : "Record"} />
			</form>
			);
	}
});
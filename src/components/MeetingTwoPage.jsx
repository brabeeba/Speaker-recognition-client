import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {BarChart} from 'react-d3-components';

export default React.createClass({
	mixins: [PureRenderMixin],
	isMeetingBegin: function () {
		return this.props.meetingOne || false
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
	getBarChartData: function () {
		var values = [];
		const data = this.props.data.toObject();
		

		for (var key in data) {
			values.push({x: key, y: data[key]});
		}

		return values
	},
	finishMeeting: function () {
		clearInterval(this.interval);
		this.props.switchLabel("Train");
		this.props.beginMeetingOne();
		this.props.closeMeetingHandle(this.props.groupid);
		this.props.nextPage();
	},

	render: function () {
		return (
			<div>
			<h1>Meeting 2</h1>
			<h2>Please Take 15 minutes</h2>
			{(this.isMeetingBegin() ? <div></div> : <button onClick = {() =>{ 
							this.props.beginMeetingOne(); 
							this.props.switchLabel("Predict");
							this.interval = setInterval(() => {
							this.props.countDown();
							if(this.timeExist() && this.props.setupTimer <= 0) {
								this.finishMeeting();
							}
						}, 1000);}}><h1>Begin Meeting 2</h1></button>)}

			{(this.timeExist() ? <h2>Timer: {this.getTime()}</h2> : <div></div>)}

			{(() => {
				switch (this.props.condition) {
				case "Condition B":
					return (
					<div>
						{(this.getBarChartData().length === 0 ? <div></div> : <BarChart  data={{values: this.getBarChartData(), label: "Share of voice in this meeting (live)"}} width={400} height={400} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>)}
						</div>
						);
				case "Conditon C":
					return (
						<div></div>
						);
				}
			})()}
			
			<button onClick = {() => {this.finishMeeting();}}>End Meeting 2</button>
			</div>
		);
		
	}
})
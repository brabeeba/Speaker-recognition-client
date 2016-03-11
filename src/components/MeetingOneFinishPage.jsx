import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {BarChart} from 'react-d3-components';

export default React.createClass({
	mixins: [PureRenderMixin],
	getBarChartData: function () {
		var values = [];
		const data = this.props.data.toObject();
		for (var key in data) {
			values.push({x: key, y: data[key]});
		}

		return values
	},
	render: function () {
		return (
			<div>
				<h1>Thank you for completing meeting 1</h1>
				<h2>Task 2 Introduction</h2>
				<h3>Research team to explain task 2</h3>
				{(() => {
					switch(this.props.condition) {
					case "Condition B":
						return (<div>{(this.getBarChartData().length === 0 ? <div></div> : <BarChart  data={{values: this.getBarChartData(), label: "Share of voice in this meeting (live)"}} width={400} height={400} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>)}</div>);
					case "Condition C":
						return (<div></div>);
					}
				})()}
				<button onClick = {() => { this.props.setTime(900); this.props.clearData(); this.props.nextPage(); this.props.openMeetingHandle(this.props.groupid, this.props.condition, "Meeting 2");}}><h1>Go to Meeting 2</h1></button>
			</div>
		);
	}
})
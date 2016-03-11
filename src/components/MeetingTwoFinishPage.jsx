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
				<h1>Thank you for completing meeting 2</h1>
				{(() => {
					switch(this.props.condition) {
					case "Condition B":
						return (<div>{(this.getBarChartData().length === 0 ? <div></div> : <BarChart  data={{values: this.getBarChartData(), label: "Share of voice in this meeting (live)"}} width={400} height={400} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>)}</div>);
					case "Condition C":
						return (<div></div>);
					}
				})()}
				<button onClick = {() => {this.props.clearData(); this.props.nextPage();}}><h1>Next</h1></button>
			</div>
		);
	}
})
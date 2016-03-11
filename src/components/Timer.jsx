import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	componentDidMount: function () {
		this.interval = setInterval(this.props.addSecond, 1000);
	},

	componentWillUnmount: function () {
		clearInterval(this.interval)
	},
	timeExist: function () {

		return !!this.props.time
	},

	getTime: function () {
		const time = this.props.time
		const hour = Math.floor(time / 3600)
		const minute = Math.floor((time - 3600 * hour) / 60)
		const second = time - 3600 * hour - 60 * minute
		return (hour === 0 ? `${minute}:${second}` : `${hour}:${minute}:${second}`)
	},

	render: function () {
		return (
			<div>
			{this.timeExist() ? 
				<h2>Time: {this.getTime()}</h2>
			 : <div></div>}
			 </div>
			
			);
	}
});
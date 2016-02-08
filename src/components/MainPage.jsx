import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Switch from './Switch'
import TrainingForm from './TrainingForm'

import {connect} from 'react-redux';

import * as actionCreator from '../action_creator';

import {BarChart} from 'react-d3-components'


export const MainPage = React.createClass({
	componentDidMount: function () {

		var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {

		  var getUserMedia = (navigator.getUserMedia ||
		      navigator.webkitGetUserMedia ||
		      navigator.mozGetUserMedia);

		  if(!getUserMedia) {
		    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
		  }

		  return new Promise(function(successCallback, errorCallback) {
		    getUserMedia.call(navigator, constraints, successCallback, errorCallback);
		  });
				
		}

		if(navigator.mediaDevices === undefined) {
		  navigator.mediaDevices = {};
		}

		if(navigator.mediaDevices.getUserMedia === undefined) {
		  navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
		}

		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const recorder = audioCtx.createScriptProcessor(this.props.length, 1, 1);
		const gainNode = audioCtx.createGain();
		const audio = navigator.mediaDevices.getUserMedia({audio: true});
		var source;

		audio.then((stream) => {
			source = audioCtx.createMediaStreamSource(stream);
		    source.connect(recorder);
		    recorder.connect(gainNode);
		    gainNode.connect(audioCtx.destination);
		    gainNode.gain.value = 0;

		   	console.log("Sample Rate is");
		    console.log(audioCtx.sampleRate);

		    recorder.onaudioprocess = (e) => {
		    	//console.log("recording");
		    	var inputBuffer = e.inputBuffer;


		    	if (this.props.switch === "Train") {
		    		if (this.props.isRecording) {
		      			this.props.sendAudio(inputBuffer.getChannelData(0), inputBuffer.sampleRate, this.props.label, this.props.length);
		      		}
		    	}

		    	if (this.props.switch === "Predict") {
		    		this.props.predict(inputBuffer.getChannelData(0), inputBuffer.sampleRate, this.props.length);
		    	}
		
		      
		    }
		    
		}).catch((error) => {
			console.log(error.name + ":" + error.message);
		});
	},
	getSelected: function () {
		return this.props.selected || null
	},
	getButtons: function () {
		return this.props.buttons || []
	},
	getIsRecording: function () {
		return this.props.isRecording || false
	},
	getBarChartData: function () {
		var values = []
		const data = this.props.data.toObject()
		
		for (var key in data) {
			values.push({x: key, y: data[key]})
		}
		return values
	},
	render: function () {
		
		return (
			<div>
			<Switch buttons = {this.getButtons()} selected = {this.getSelected()} switchLabel = {this.props.switchLabel}/>
			{(() => {
				switch (this.getSelected()) {
				case this.getButtons().get(0):
					return (<TrainingForm isRecording = {this.getIsRecording()} record = {this.props.record} stop = {this.props.stop} />);
				case this.getButtons().get(1):
					if (this.getBarChartData().length === 0) {
						return
					} else {
						return (<BarChart data={{values: this.getBarChartData()}} width={400} height={400} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>);
					}
					
				default:
					return;
				}
			})()}
			</div>
			
			);
	}
});

function mapStateToProps (state) {
	return {
	    buttons: state.get('buttons'),
	    isRecording: state.get('isRecording'),
	    selected: state.get('switchLabel'),
	    length: state.get('length'),
	    label: state.get('label'),
	    switch: state.get('switchLabel'),
	    data: state.get('data')
	  }
}

export const MainPageContainer = connect(mapStateToProps, actionCreator)(MainPage);
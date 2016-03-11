import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Switch from './Switch';
import TrainingForm from './TrainingForm';
import Timer from './Timer';

import {connect} from 'react-redux';

import * as actionCreator from '../action_creator';

import {BarChart} from 'react-d3-components';

import ConditionPage from './ConditionPage';
import SetupPage from './SetupPage';
import TaskOnePage from './TaskOnePage';
import MeetingOnePage from './MeetingOnePage';
import MeetingOneFinishPage from './MeetingOneFinishPage';
import MeetingTwoPage from './MeetingTwoPage';
import MeetingTwoFinishPage from './MeetingTwoFinishPage';
import FinishPage from './FinishPage';


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
		      			this.props.sendAudio(inputBuffer.getChannelData(0), inputBuffer.sampleRate, this.props.label, this.props.length, this.props.groupid, this.props.participantid);
		      		}
		    	}

		    	if (this.props.switch === "Predict") {
		    		this.props.predict(inputBuffer.getChannelData(0), inputBuffer.sampleRate, this.props.length, this.props.groupid);
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
			{(() => {
				switch (this.props.page) {
				case 1:
					return (<ConditionPage selectCondition = {this.props.selectCondition} nextPage = {this.props.nextPage} setTime = {this.props.setTime}/>);
				case 2:
					return (<SetupPage nextPage = {this.props.nextPage} record = {this.props.record} participants = {this.props.participants} isRecording = {this.getIsRecording()} stop = {this.props.stop} setupTimer = {this.props.setupTimer} countDown = {this.props.countDown} startOver = {this.props.startOver} groupid = {this.props.groupid} completeSetup = {this.props.completeSetup}/>);
				case 3:
					return (<TaskOnePage nextPage = {this.props.nextPage} startOver = {this.props.startOver} participants = {this.props.participants} groupid = {this.props.groupid} setTime = {this.props.setTime} openMeetingHandle = {this.props.openMeetingHandle} condition = {this.props.condition}/>);
				case 4:
					return (<MeetingOnePage data = {this.props.data} setupTimer = {this.props.setupTimer} beginMeetingOne = {this.props.beginMeetingOne} switchLabel = {this.props.switchLabel} countDown = {this.props.countDown} nextPage = {this.props.nextPage} condition = {this.props.condition} meetingOne = {this.props.meetingOne} closeMeetingHandle = {this.props.closeMeetingHandle} groupid = {this.props.groupid}/>);
				case 5:
					return (<MeetingOneFinishPage data = {this.props.data} nextPage = {this.props.nextPage} setTime = {this.props.setTime} clearData = {this.props.clearData} condition = {this.props.condition} openMeetingHandle = {this.props.openMeetingHandle} condition = {this.props.condition} groupid = {this.props.groupid}/>);

				case 6:
					return (<MeetingTwoPage data = {this.props.data} setupTimer = {this.props.setupTimer} beginMeetingOne = {this.props.beginMeetingOne} switchLabel = {this.props.switchLabel} countDown = {this.props.countDown} nextPage = {this.props.nextPage} condition = {this.props.condition} meetingOne = {this.props.meetingOne} closeMeetingHandle = {this.props.closeMeetingHandle} groupid = {this.props.groupid}/>);
				case 7:
					return (<MeetingTwoFinishPage data = {this.props.data} nextPage = {this.props.nextPage} setTime = {this.props.setTime} clearData = {this.props.clearData} condition = {this.props.condition}/>);

				case 8:
					return (
						<FinishPage finishMeeting = {this.props.finishMeeting} groupid = {this.props.groupid}/>
						);
					
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
	    data: state.get('data'),
	    time: state.get('time'),
	    page: state.get('page'),
	    condition: state.get('condition'),
	    participants: state.get('participants'),
	    setupTimer: state.get('setupTimer'),
	    groupid: state.get('groupid'),
	    participantid: state.get('participantid'),
	    meetingOne: state.get('meetingOne')
	  }
}

export const MainPageContainer = connect(mapStateToProps, actionCreator)(MainPage);
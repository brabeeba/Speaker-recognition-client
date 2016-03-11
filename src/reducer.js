import {List, Map} from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}

function record(state, isRecording, label, groupid, participantid) {
	return state.set('isRecording', !isRecording).set('label', label).set('groupid', groupid).set('participantid', participantid).update('participants', List(), participants => participants.push(label))
}

function switchLabel(state, label) {
	return state.set('switchLabel', label)
}

function addData(state, label, second) {
	return state.updateIn(['data', label], 0, value => value + second)
}

function addSecond(state) {
	return state.update('time', 0, value => value + 1)
}

function register(state, user) {
	return state.set('user', user)
}

function leave(state, user) {
	return state.delete('user')
}

function nextPage(state) {
	return state.update('page', 0, value => value + 1);
}

function selectCondition(state, condition) {
	return state.set('condition', condition)
}

function stop(state) {
	return state.set('isRecording', false).set('setupTimer', 60)
}

function countDown(state) {
	return state.update('setupTimer', 60, value => value - 1)
}

function startOver(state) {
	return state.delete('label').delete('groupid').delete('participantid').delete('participants').set('isRecording', false).set('setupTimer', 60).set('page', 2)
}

function setTime(state, time) {
	return state.set('setupTimer', time)
}

function beginMeetingOne(state) {
	return state.update('meetingOne', true, value => !value)
}

function clearData(state) {
	return state.set('data', Map())
}

function finish(state) {
	const initalState = {
	  isRecording: false,
	  switchLabel: "Train",
	  buttons: ["Train", "Predict"],
	  length: 2048,
	  page: 1,
	  data: {},
	  meetingOne: false
	}
	return Map().merge(initalState)
}

export default function(state = Map(), action) {
	switch (action.type) {
	case 'STATE':
		return setState(state, action.state)

	case 'RECORD':
		return record(state, action.isRecording, action.label, action.groupid, action.participantid)

	case 'SWITCH':
		return switchLabel(state, action.label)

	case 'DATA':
		return addData(state, action.label, action.second)
	case 'TIME':
		return addSecond(state)
	case 'REGISTER':
		return register(state, action.user)
	case 'LEAVE':
		return leave(state, action.user)
	case 'NEXT':
		return nextPage(state)
	case 'CONDITION':
		return selectCondition(state, action.condition)
	case 'TRAIN':
		return stop(state)
	case 'COUNTDOWN':
		return countDown(state)
	case 'STARTOVER':
		return startOver(state)
	case 'SET_TIME':
		return setTime(state, action.time)
	case 'BEGIN_MEETING_1':
		return beginMeetingOne(state)
	case 'CLEARDATA':
		return clearData(state)
	case 'FINISH':
		return finish(state)
	}
	return state;
} 
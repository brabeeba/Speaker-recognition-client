import {List, Map} from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}

function record(state, isRecording, label) {

	return state.set('isRecording', !isRecording).set('label', label)
}

function switchLabel(state, label) {
	return state.set('switchLabel', label)
}

function addData(state, label, second) {
	return state.updateIn(['data', label], 0, value => value + second)
}

export default function(state = Map(), action) {
	switch (action.type) {
	case 'STATE':
		return setState(state, action.state)

	case 'RECORD':
		return record(state, action.isRecording, action.label)

	case 'SWITCH':
		return switchLabel(state, action.label)

	case 'DATA':
		return addData(state, action.label, action.second)

	}
	return state;
} 
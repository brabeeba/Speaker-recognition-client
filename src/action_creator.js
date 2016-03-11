export function setState(state) {

	return {
		type: 'STATE',
		state 
	}
}

export function record(isRecording, label, groupid, participantid) {

	return {
		type: 'RECORD',
		isRecording,
		label,
		groupid,
		participantid
	}
}

export function stop(){
	return {
    	type: 'TRAIN'
	}
}

export function predict(audio, sampleRate, length, groupid) {
	return {
    	meta: {remote: true},
    	type: 'PREDICT',
    	audio,
    	sampleRate,
    	length,
    	groupid
  	}
}

export function switchLabel(label) {
	return {
		type: 'SWITCH',
		label
	}
}

export function sendAudio(audio, sampleRate, label, length, groupid, participantid) {
  return {
    meta: {remote: true},
    type: 'AUDIO',
    audio,
    sampleRate,
    label,
    length,
    groupid,
    participantid
  }
}

export function addSecond() {
	return {
		type: 'TIME'
	}
}

export function registerGroup(groupid) {
	return {
		meta: {remote: true},
		type: 'REGISTER_GROUP',
		groupid
	}
}

export function register (user) {
	return {
		meta: {remote: true},
		type: 'REGISTER',
		user
	}
}

export function leaveRoom (user) {
	return {
		meta: {remote: true},
		type: 'LEAVE',
		user
	}
}

export function nextPage() {
	return {
		type: 'NEXT'
	}
}

export function selectCondition(condition) {
	return {
		type: 'CONDITION',
		condition
	}
}

export function countDown() {
	return {
		type: 'COUNTDOWN'
	}
}

export function startOver(groupid) {

	return {
		meta: {remote: (!!groupid ? true : false)},
		type: 'STARTOVER',
		groupid
	}
}

export function completeSetup(groupid) {
	return {
		meta: {remote: true},
		type: 'TRAIN_GROUP',
		groupid
	}
}

export function setTime(time) {
	return {
		type: 'SET_TIME',
		time
	}
}

export function beginMeetingOne() {
	return {
		type: 'BEGIN_MEETING_1'
	}
}

export function clearData() {
	return {
		type: 'CLEARDATA'
	}
}

export function finishMeeting(groupid) {
	return {
		meta: {remote: true},
		type: 'FINISH',
		groupid
	}
}

export function openMeetingHandle(groupid, condition, meeting) {
	return {
		meta: {remote: true},
		type: 'OPEN_MEETING',
		groupid,
		condition,
		meeting
	}
}

export function closeMeetingHandle(groupid, meeting) {
	return {
		meta: {remote: true},
		type: 'CLOSE_MEETING',
		groupid
	}
}
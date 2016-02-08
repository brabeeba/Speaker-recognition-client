export function setState(state) {

	return {
		type: 'STATE',
		state 
	}
}

export function record(isRecording, label) {

	return {
		type: 'RECORD',
		isRecording,
		label
	}
}

export function stop(){
	return {
		meta: {remote: true},
    	type: 'TRAIN'
	}
}

export function predict(audio, sampleRate, length) {
	return {
    	meta: {remote: true},
    	type: 'PREDICT',
    	audio,
    	sampleRate,
    	length
  	}
}

export function switchLabel(label) {
	return {
		type: 'SWITCH',
		label
	}
}

export function sendAudio(audio, sampleRate, label, length) {
  return {
    meta: {remote: true},
    type: 'AUDIO',
    audio,
    sampleRate,
    label,
    length
  }
}
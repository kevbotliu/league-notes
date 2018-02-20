export function addMatch(match) {
	return {
		type: 'ADD_MATCH',
		payload: match
	};
}

export function setTotalMatches(value) {
	return {
		type: 'SET_TOTAL_MATCHES',
		payload: value
	}
}

export function addPID(gameid, pid) {
	return {
		type: 'ADD_PID',
		id: gameid,
		payload: pid 
	}
}

export function addChamp(gameid, champ) {
	return {
		type: 'ADD_CHAMP',
		id: gameid,
		payload: champ
	}
}

export function setChampionList(data) {
	return {
		type: 'SET_CHAMPIONS',
		payload: data
	}
}
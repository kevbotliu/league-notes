export function setSummoner(summoner) {
	return {
		type: 'SET_SUMMONER',
		payload: summoner
	};
}

export function toggleSummonerModal() {
	return {
		type: 'TOGGLE_SUMMONER_VISIBLE'
	};
}

export function setRegion(reg) {
	return {
		type: 'SET_REGION',
		payload: reg
	}
}
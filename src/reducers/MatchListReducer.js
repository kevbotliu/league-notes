const MatchListReducer = (state = {
	totalMatches: 0,
	matches: [],
	matchInfo: {},
	champions: {}
}, action) => {
	switch(action.type) {
		case 'SET_TOTAL_MATCHES':
			return {
				...state,
				totalMatches: action.payload
			}
		case 'ADD_MATCH':
			if (state.matches.length) {
				for (let i = 0; i < state.matches.length; i++) {
					if (state.matches[i].gameCreation < action.payload.gameCreation) {
						return {
							...state,
							matches: [...state.matches.slice(0, i), action.payload, ...state.matches.slice(i)],
							matchInfo: {
								...state.matchInfo,
								[action.payload.gameId]: {
									pid: 1,
									champ: {},
									comments: []
								}
							}
						}
					}
				}
			}
			return {
				...state,
				matches: [...state.matches, action.payload],
				matchInfo: {
					...state.matchInfo,
					[action.payload.gameId]: {
						pid: 1,
						champ: {},
						comments: []
					}
				}
			};
		case 'ADD_PID':
			return {
				...state,
				matchInfo: {
					...state.matchInfo,
					[action.id]: {
						...state.matchInfo[action.id],
						pid: action.payload
					}
				}
			}
		case 'SET_CHAMPIONS':
			return {
				...state,
				champions: action.payload
			}
		case 'ADD_CHAMP':
			return {
				...state,
				matchInfo: {
					...state.matchInfo,
					[action.id]: {
						...state.matchInfo[action.id],
						champ: action.payload
					}
				}
			}
		
		default:
			return {
				...state
			}
	}
}

export default MatchListReducer;
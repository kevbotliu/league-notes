import api_key from '../key'

const MainViewReducer = (state = {
	summonerInputIsVisible: true,
	summoner: {},
	region: null,
	key: '?api_key=' + api_key
}, action) => {
	switch(action.type) {
		case 'TOGGLE_SUMMONER_VISIBLE':
			return {
				...state,
				summonerInputIsVisible: !state.summonerInputIsVisible
			};
		case 'SET_SUMMONER':
			return {
				...state,
				summoner: action.payload
			};
		case 'SET_REGION': {
			return {
				...state,
				region: action.payload
			}
		}
		default:
			return {
				...state
			}
	}
}

export default MainViewReducer;
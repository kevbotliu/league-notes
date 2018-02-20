import {createStore, combineReducers} from 'redux'
import MainView from './reducers/MainViewReducer'
import MatchList from './reducers/MatchListReducer'

export default createStore(
	combineReducers({
		MainView,
		MatchList
	}),
	{},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
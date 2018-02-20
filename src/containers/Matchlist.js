import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Matchlist.css'

import Match from '../components/Match'

import {addMatch, setTotalMatches, addPID, addChamp, setChampionList} from '../actions/MatchListActions'

var RateLimiter = require('limiter').RateLimiter;
let limiter = new RateLimiter(10, 1000);

class Matchlist extends Component {

	setPID = (match) => {
		match.participantIdentities.forEach((participant) => {
			if (this.props.summoner.accountId === participant.player.accountId) {
				this.props.addPID(match.gameId, participant.participantId)
			}
		})
	}

	setChampion = (match) => {
		let pid = this.props.matchInfo[match.gameId].pid;
		for (let champ in this.props.champions.data) {
			if (parseInt(this.props.champions.data[champ].key, 10) === match.participants[pid-1].championId) {
				this.props.addChamp(match.gameId, this.props.champions.data[champ])
			}
		}
	}

	componentDidMount() {
		const getChampListUrl = 'http://ddragon.leagueoflegends.com/cdn/7.22.1/data/en_US/champion.json'
		fetch(getChampListUrl)
		.then(r => {
			if (r.ok) return r.json()
			else if (r.status === 404) throw new Error('404: No champion data found')
			else if (r.status === 429) throw new Error('429: Too many requests')
			else throw new Error('Bad network request')
		})
		.then(r => this.props.setChampionList(r))
		.catch(console.log)

		const getMatchlistUrl = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + this.props.summoner.accountId + '/recent' + this.props.apikey
		fetch(getMatchlistUrl)
		.then(r => {
			if (r.ok) return r.json()
			else if (r.status === 404) throw new Error('404: No match data found')
			else if (r.status === 429) throw new Error('429: Too many requests')
			else throw new Error('Bad network request')
		})
		.then(d => {
			this.props.setTotalMatches(d.totalGames)
			d.matches.forEach((match) => {
				const getMatchUrl = 'https://na1.api.riotgames.com/lol/match/v3/matches/' + match.gameId + this.props.apikey
				return (
					limiter.removeTokens(1, () => {
						fetch(getMatchUrl)
						.then(r => {
							if (r.ok) return r.json()
							else if (r.status === 404) throw new Error('404: No match data found')
							else if (r.status === 429) throw new Error('429: Too many requests')
							else throw new Error('Bad network request')
						})
						.then((match) => {
							this.props.addMatch(match)
							this.setPID(match)
							this.setChampion(match)
						})
						.catch(console.log)
					})
				)
			})
		})
		.catch(console.log)
	}

	render() {
		return (
			<div className="container">
				{this.props.matches.map((match) => 
					<Match
						match={match}
						matchInfo={this.props.matchInfo[match.gameId]}
						key={match.gameId}
					/>)}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		summoner: state.MainView.summoner,
		matches: state.MatchList.matches,
		matchInfo: state.MatchList.matchInfo,
		champions: state.MatchList.champions,
		apikey: state.MainView.key
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTotalMatches: (value) => dispatch(setTotalMatches(value)),
		addMatch: (list) => dispatch(addMatch(list)),
		addPID: (gameid, pid) => dispatch(addPID(gameid, pid)),
		addChamp: (gameid, pid) => dispatch(addChamp(gameid, pid)),
		setChampionList: (data) => dispatch(setChampionList(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Matchlist);
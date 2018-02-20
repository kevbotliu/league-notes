import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MainView.css'

import Matchlist from '../containers/Matchlist'
import Header from '../components/Header'

import {setSummoner, toggleSummonerModal, setRegion} from '../actions/MainViewActions'

const regions = ['BR', 'EUN', 'EUW', 'JP', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'TR', 'RU', 'PBE'];

class MainView extends Component {
	state = {inputValue: ''}

	handleChange = (e) => {
		this.setState({
			inputValue: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const getSummonerUrl = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + encodeURI(this.state.inputValue) + this.props.apikey
		fetch(getSummonerUrl)
		.then(r => {
			if (r.ok) return r.json()
			else if (r.status === 404) {
				this.setState({
					inputValue: ''
					//TODO: invalid name indicator
				})
				throw new Error('404: Invalid summoner name')
			}
			else throw new Error('Bad network response')
		})
		.then(d => {
			//TODO: valid name indicator
			this.props.setSummoner(d)
			this.props.toggleSummonerModal();
		})
		.catch(console.log)
	}

	render() {
		if (this.props.summonerInputIsVisible) return (
			<div className="input-grid-container">
				<div className="input-wrapper">
					<h1 className="card title">league-notes</h1>
					<form className="card form-container" onSubmit={this.handleSubmit}>
						<select name="regions">
							{regions.map(value => <option key={value} value={value}>{value}</option>)}
						</select>
						<input type="text" placeholder="summoner name" tabIndex="1" spellCheck="false" onChange={this.handleChange} value={this.state.inputValue}/>
						<input type="submit" value="" onClick={this.handleSubmit} />
					</form>
				</div>
			</div>
		)
		return (
			<div className="main-grid-container">
				<Header summoner={this.props.summoner}/>
				<Matchlist />
				<div style={{margin: '20px'}} className="card detail-pane"></div>
				<div style={{margin: '20px'}} className="card comment-box"></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		region: state.MainView.region,
		summoner: state.MainView.summoner,
		summonerInputIsVisible: state.MainView.summonerInputIsVisible,
		apikey: state.MainView.key
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setSummoner: (sumObj) => dispatch(setSummoner(sumObj)),
		toggleSummonerModal: () => dispatch(toggleSummonerModal()),
		setRegion: (region) => dispatch(setRegion(region))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
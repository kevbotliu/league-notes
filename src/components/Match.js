import React from 'react';
import {object} from 'prop-types';
import './Match.css';

import classNames from 'classnames'

import queueIds from '../data/queueIds.json'


const Match = ({match, matchInfo}) => {

	console.log(queueIds[match.queueId])

	let d = new Date(match.gameCreation);
	const matchCreation = () => {
		let age = Date.now() - match.gameCreation;
		if (age > 604800000) return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear() % 100;
		if (age > 86400000) return Math.floor(age / 86400000) + (Math.floor(age / 86400000) === 1 ? ' day ago' : ' days ago');
		if (age > 3600000) return Math.floor(age / 3600000) + (Math.floor(age / 3600000) === 1 ? ' hour ago' : ' hours ago');
		if (age > 60000) return Math.floor(age / 60000) + (Math.floor(age / 60000) === 1 ? ' minute ago' : ' minutes ago');
		return (age / 1000 + ' seconds ago');
	}
	const matchDuration = Math.round(match.gameDuration / 60) + ' mins';

	const p = match.participants[matchInfo.pid-1];
	const items = [p.stats.item0, p.stats.item1, p.stats.item2, p.stats.item3, p.stats.item4, p.stats.item5, p.stats.item6];


	const kda = ((p.stats.kills + p.stats.assists) / p.stats.deaths).toFixed(2);
	const killp = () => {
		let totalKills = 0;
		match.participants.forEach(part => {
			if (part.teamId === p.teamId) totalKills += part.stats.kills
		});
		return Math.round(((p.stats.kills + p.stats.assists) / totalKills) * 100);
	};
	const creepScore = p.stats.totalMinionsKilled;
	
	return (
		<div className="match-container">
			<div className={classNames('match-wrapper', 'card', {'lose': !p.stats.win}, {'win': p.stats.win})}>
				<div className="kda">
					<ul>
						<li className="kills">{p.stats.kills}</li>
						<li className="deaths">{p.stats.deaths}</li>
						<li className="assists">{p.stats.assists}</li>
					</ul>
				</div>
				<div className="matchinfo-container">
					<div className="header">
						<span style={{marginLeft: '2px'}}>{queueIds[match.queueId].desc}</span>
						<span style={{color: 'var(--light-dark)', fontWeight: '400'}}>{' · ' + matchCreation() + ' · '}</span>
						<span style={{color: 'var(--light-dark)', fontWeight: '400'}}>{matchDuration}</span>
						<span style={{marginLeft: 'auto', fontSize: '0.9em'}}>{p.stats.win ? 'VICTORY' : 'DEFEAT'}</span>
					</div>
					<img className="champ-icon" src={'http://ddragon.leagueoflegends.com/cdn/8.4.1/img/champion/' + encodeURI(matchInfo.champ.name) + '.png'} alt=""/>
					<div className="item-container">
						{items.map((item, i) => <img className={classNames({'blank': !item})} src={item ? 'http://ddragon.leagueoflegends.com/cdn/8.4.1/img/item/' + item + '.png' : ''} alt={item ? item : ''} key={i} />)}
					</div>
					<span className="champ-level">{matchInfo.champ.name}<sup style={{fontWeight: '700'}}>{p.stats.champLevel}</sup><span className="champ-role">{' · ' + p.timeline.lane + (p.timeline.role !== 'NONE' ? (' | ' + p.timeline.role.replace('_',' ')) : '')}</span></span>
					<span className="kda-percent">
						<span>KDA: </span>{kda}
					</span>
					<span className="kill-part">
						<span>KP: </span>{killp() + '%'}
					</span>
					<span className="creep-score">
						<span>CS: </span>{creepScore}
					</span>
				</div>
			</div>
		</div>
		
	);
};

//<span className="champ-role">{p.timeline.lane + (p.timeline.role !== 'NONE' ? (' | ' + p.timeline.role.replace('_',' ')) : '')}</span>


Match.defaultProps = {
	match: {},
	matchInfo: {
		pid: 1,
		champ: {},
		comments: []
	}
}

Match.propTypes = {
	match: object.isRequired,
	matchInfo: object.isRequired
}

export default Match;
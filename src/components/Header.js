import React from 'react';
import './Header.css'

const Header = ({summoner}) => {
	return (
		<div className="card header-container">
			<div className="summoner-container">
				<img className="card" src={'http://ddragon.leagueoflegends.com/cdn/8.4.1/img/profileicon/' + summoner.profileIconId + '.png'} alt=""/>
				<h1>{summoner.name}</h1>
			</div>
			<div className="title-container">
				<h1>league-notes</h1>
			</div>
		</div>
	)
}

export default Header
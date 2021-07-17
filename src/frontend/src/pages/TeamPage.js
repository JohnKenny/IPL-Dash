import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';


import './TeamPage.scss';

export const TeamPage = () => {

    // team state intitialises with an empty array '[]'
    const [ team, setTeam ] = useState({matches: []});
    const { teamName } = useParams();

    useEffect(
        () => {
            const fetchTeam = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
                 
            };
            fetchTeam();
           
        },
        // added dependency  
        [teamName] // empty [] -> call useEffect only on first component load
    );

  if(!team || !team.teamName){
      return <h2>Team not found</h2>
  }

  return (
    <div className="TeamPage">
        <div className="team-name-section"><h1 className="team-name">{ team.teamName }</h1></div> 
        <div className="win-loss-section">Wins / Losses
        <PieChart
            data={[
            { title: 'Losses', value: team.totalMatches - team.totalWins, color: 'crimson' },
            { title: 'Wins', value: team.totalWins, color: 'rgb(197, 89, 197)' }          
            ]}
            />
        </div>
        <div className="match-detail-section">
            <h3>Latest matches</h3>    
            <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
        </div>
        {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName}  match={match}/>)}
        <div className="more-link">
            <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More {'>'} </Link>
        </div>
    </div>
  );
}


import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

    // team state intitialises with an empty array '[]'
    const [ team, setTeam ] = useState({matches: []});
    

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch('http://localhost:8080/team/Rajasthan Royals');
                const data = await response.json();
                setTeam(data);
                 
            };
            fetchMatches();
           
        },
        [] // empty [] -> call useEffect only on first component load
    );

  return (
    <div className="TeamPage">
        <h1>{ team.teamName }</h1> 
        <MatchDetailCard match={team.matches[0]}/>
        {team.matches.slice(1).map(match => <MatchSmallCard match={match}/>)}
           
    </div>
  );
}


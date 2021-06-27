import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

    // team state intitialises with an empty array '[]'
    const [ team, setTeam ] = useState({matches: []});
    const { teamName } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
                 
            };
            fetchMatches();
           
        },
        // added dependency  
        [teamName] // empty [] -> call useEffect only on first component load
    );

  if(!team || !team.teamName){
      return <h2>Team not found</h2>
  }

  return (
    <div className="TeamPage">
        <h1>{ team.teamName }</h1> 
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
        {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName}  match={match}/>)}
           
    </div>
  );
}


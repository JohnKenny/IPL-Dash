import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

    const [ team, setTeam ] = useState({});
    

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch('http://localhost:8080/team/Rajasthan Royals');
                const data = await response.json();
                setTeam(data);
                 
            };
            fetchMatches();
           
        }
        //[] // empty [] -> useEffect runs when component loads
    );

  return (
    <div className="TeamPage">
        <h1>{ team.teamName }</h1> 
        <MatchDetailCard />
        <MatchSmallCard />
        <MatchSmallCard /> 
        <MatchSmallCard />
           
    </div>
  );
}


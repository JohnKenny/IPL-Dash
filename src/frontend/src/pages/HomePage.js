import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
  
import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    // team state intitialises with an empty array '[]'
    const [ teams, setTeams ] = useState([]);
    

    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`http://localhost:8080/team`);
                const data = await response.json();
                setTeams(data);
                 
            };
            fetchAllTeams();
           
        },
        // added dependency  
        [] // empty [] -> call useEffect only on first component load
    );


  return (
    <div className="HomePage">
        <div className="header-section"><h1 className="app-name">IPL Dashboard</h1></div> 
        <div className="team-grid">
            { teams.map(team => <TeamTile teamName={team.teamName}/>)}
        </div>
    </div>
        
  );
}


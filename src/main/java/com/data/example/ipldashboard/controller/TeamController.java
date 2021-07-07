package com.data.example.ipldashboard.controller;

import com.data.example.ipldashboard.model.Match;
import com.data.example.ipldashboard.model.Team;
import com.data.example.ipldashboard.repository.MatchRepository;
import com.data.example.ipldashboard.repository.TeamRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team")
     public Iterable<Team> getAllTeams(){
       return this.teamRepository.findAll();      
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year){
       LocalDate startDate = LocalDate.of(year, 1, 1);
       LocalDate endDate = LocalDate.of(year + 1, 1, 1);
       return this.matchRepository.getMatchesByTeamBetweenDates(
           teamName, startDate, endDate);
        
       
    } 


    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){    
       Team team =  this.teamRepository.findByTeamName(teamName);
       team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 4)) ;

       return team; 
       
    }

    


    
}

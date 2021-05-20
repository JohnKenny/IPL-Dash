package com.data.example.ipldashboard.controller;

import com.data.example.ipldashboard.model.Team;
import com.data.example.ipldashboard.repository.MatchRepository;
import com.data.example.ipldashboard.repository.TeamRepository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }


    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        
       Team team =  this.teamRepository.findByTeamName(teamName);
       Pageable pageable = PageRequest.of(0, 4);
       team.setMatches(matchRepository.getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, pageable)) ;

       return team; 
       
    }


    
}

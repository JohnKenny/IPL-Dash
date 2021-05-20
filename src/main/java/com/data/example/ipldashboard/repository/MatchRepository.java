package com.data.example.ipldashboard.repository;

import com.data.example.ipldashboard.model.Match;
import java.util.*;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);
    
}

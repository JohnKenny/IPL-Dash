package com.data.example.ipldashboard.data;


import java.util.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.data.example.ipldashboard.model.Team;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import net.bytebuddy.dynamic.loading.InjectionClassLoader.Strategy;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final EntityManager em;

  @Autowired
  public JobCompletionNotificationListener(EntityManager em) {
    this.em = em;
  }

  @Override
  @Transactional
  public void afterJob(JobExecution jobExecution) {
    if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      Map<String, Team> teamData = new HashMap<>();


      // using JPQL, team name and number of matches in team1 column
      em.createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class)
        .getResultList()
        .stream()
        .map(e -> new Team((String)e[0], (long)e[1]))
        .forEach(team -> teamData.put(team.getTeamName(), team));
        

        em.createQuery("select m.team2, count(*) from Match m group by m.team2", Object[].class)
          .getResultList()
          .stream()
          .forEach(e -> {
            Team team = teamData.get((String)e[0]);
            team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
          });
        
        // totals number of team name occurences in win column to get number of wins
        em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)  
        .getResultList()
        .stream()
        .forEach(e -> {
          Team team = teamData.get((String)e[0]);
          if (team != null) team.setTotalWins((long)e[1]);
        });

        // persists to db
        teamData.values().forEach(team -> em.persist(team));
        // calls toString()
        teamData.values().forEach(team -> System.out.println(team));

    }
  }
}
 
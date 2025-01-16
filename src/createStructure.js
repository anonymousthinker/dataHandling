import data from "./match.json" with {type: "json"};
import { struct, teamStruct } from "../utils/structure.js";

const updatePoints = (teamStats, team, match) => {

}

const updateGoalCount = (teamStats, team, teamNo, match) => {
  teamStats[team]["GF"] += match.score.ft[teamNo];
  teamStats[team]["GA"] += match.score.ft[1 - teamNo];
  teamStats[team]["GD"] = teamStats[team]["GF"] - teamStats[team]["GA"];

  return teamStats;
}

const updateScores = (teamStats, team, teamNo, match) => {
  teamStats[team]["W"] +=
    match.score.ft[teamNo] > match.score.ft[1 - teamNo] ? 1 : 0;
  teamStats[team]["D"] +=
    match.score.ft[teamNo] === match.score.ft[1 - teamNo] ? 1 : 0;
  teamStats[team]["L"] +=
    match.score.ft[teamNo] < match.score.ft[1 - teamNo] ? 1 : 0;
  
  return teamStats;
};

const updateTeam2 = (teamStats, match) => {
  if (!(match.team2 in teamStats)) {
    teamStats[match.team2] = { ...teamStruct() };
  }
  teamStats[match.team2]["MP"] += 1;
  teamStats = updateScores(teamStats, match.team2, 1, match); // change this
  teamStats = updateGoalCount(teamStats, match.team2, 1, match);
  teamStats = updatePoints(teamStats, match.team2, match);
  return teamStats;
};

const updateTeam1 = (teamStats, match) => {
  if (!(match.team1 in teamStats)) {
    teamStats[match.team1] = { ...teamStruct() };
  }
  teamStats[match.team1]["MP"] += 1;
  teamStats = updateScores(teamStats, match.team1, 0, match); //change this
  teamStats = updateGoalCount(teamStats, match.team1, 0, match);
  return teamStats;
};

const attainStats = (teamStats, match) => {
  teamStats = updateTeam1(teamStats, match);
  teamStats = updateTeam2(teamStats, match);
  return teamStats;
};

const main = () => {
  const matches = Object.values(data)[1];
  const matchData = matches.reduce(attainStats, {});
  console.table(matchData);
};

main();

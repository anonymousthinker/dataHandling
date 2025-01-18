import data from "./match.json" with {type: "json"};
import { struct, teamStruct } from "../utils/structure.js";

const goalsForHomeAndAway = (match) => {
  return { home: match.score.ft[0], away: match.score.ft[1] };
};

const updatePoints = (teamStats, team, teamSide, oppoSide, match) => {
  const classify = goalsForHomeAndAway(match);
  teamStats[team].Pts += classify[teamSide] > classify[oppoSide] ? 3 : 0;
  teamStats[team].Pts += classify[teamSide] === classify[oppoSide] ? 1 : 0;

  return teamStats;
};

const updateGoalCount = (teamStats, team, teamSide, oppoSide, match) => {
  const classify = goalsForHomeAndAway(match);
  teamStats[team].GF += classify[teamSide];
  teamStats[team].GA += classify[oppoSide];
  teamStats[team].GD = teamStats[team].GF - teamStats[team].GA;

  return teamStats;
};

const updateScores = (teamStats, team, teamSide, oppoSide, match) => {
  const classify = goalsForHomeAndAway(match);
  teamStats[team].W += classify[teamSide] > classify[oppoSide] ? 1 : 0;
  teamStats[team].D += classify[teamSide] === classify[oppoSide] ? 1 : 0;
  teamStats[team].L += classify[teamSide] < classify[oppoSide] ? 1 : 0;

  return teamStats;
};

const updateTeam = (teamStats, teamName, { teamSide, oppoSide }, match) => {
  if (!(teamName in teamStats)) {
    teamStats[teamName] = { ...teamStruct() };
  }

  teamStats[teamName].MP += 1;
  teamStats = updateScores(teamStats, teamName, teamSide, oppoSide, match);
  teamStats = updateGoalCount(teamStats, teamName, teamSide, oppoSide, match);
  teamStats = updatePoints(teamStats, teamName, teamSide, oppoSide, match);
  return teamStats;
};

const attainStats = (teamStats, match) => {
  teamStats = updateTeam(
    teamStats,
    match.team1,
    {
      teamSide: "home",
      oppoSide: "away",
    },
    match
  );
  teamStats = updateTeam(
    teamStats,
    match.team2,
    {
      teamSide: "away",
      oppoSide: "home",
    },
    match
  );
  return teamStats;
};

const main = () => {
  const matches = Object.values(data)[1];
  const matchData = matches.reduce(attainStats, {});
  const sortedData = Object.fromEntries(
    Object.entries(matchData).sort(
      ([, { Pts: Pts1 }], [, { Pts: Pts2 }]) => Pts2 - Pts1
    )
  );

  console.table(sortedData);
  return matchData;
};

main();

import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import {
  goalsForHomeAndAway,
  updatePoints,
  updateGoalCount,
  updateScores,
  updateTeam,
} from "../src/structureLib.js";

describe("test goalsForHomeAndAway", () => {
  it("when provided match details should provide me the goals scored for home and away when final score in 0-0", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "Burnley FC",
      team2: "Manchester City FC",
      score: {
        ht: [0, 0],
        ft: [0, 0],
      },
    };
    const expected = { home: 0, away: 0 };
    assertEquals(goalsForHomeAndAway(match), expected);
  });
  it("when provided match details should provide me the goals scored for home and away when final score in 2-1", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "Burnley FC",
      team2: "Manchester City FC",
      score: {
        ht: [0, 0],
        ft: [2, 1],
      },
    };
    const expected = { home: 2, away: 1 };
    assertEquals(goalsForHomeAndAway(match), expected);
  });
  it("when provided match details should provide me the goals scored for home and away when final score in 1-3", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "Burnley FC",
      team2: "Manchester City FC",
      score: {
        ht: [0, 0],
        ft: [1, 3],
      },
    };
    const expected = { home: 1, away: 3 };
    assertEquals(goalsForHomeAndAway(match), expected);
  });
  it("when provided match details should provide me the goals scored for home and away when final score in 3-3", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "Burnley FC",
      team2: "Manchester City FC",
      score: {
        ht: [1, 2],
        ft: [3, 3],
      },
    };
    const expected = { home: 3, away: 3 };
    assertEquals(goalsForHomeAndAway(match), expected);
  });
});

describe("test updatePoints", () => {
  it("return updated points when team wins", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 0],
      },
    };
    const expected = { demoTeam1: { Pts: 3 } };
    assertEquals(
      updatePoints(
        { demoTeam1: { Pts: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated points when team draws", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 2],
      },
    };
    const expected = { demoTeam1: { Pts: 1 } };
    assertEquals(
      updatePoints(
        { demoTeam1: { Pts: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated points when team loses", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [0, 2],
      },
    };
    const expected = { demoTeam1: { Pts: 0 } };
    assertEquals(
      updatePoints(
        { demoTeam1: { Pts: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
});

describe("test updateGoalCount", () => {
  it("return updated goalCount when team scores 2 goals", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 0],
      },
    };
    const expected = { demoTeam1: { GF: 2, GA: 0, GD: 2 } };
    assertEquals(
      updateGoalCount(
        { demoTeam1: { GF: 0, GA: 0, GD: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated goalCount when team concedes 3 goals", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [0, 3],
      },
    };
    const expected = { demoTeam1: { GF: 0, GA: 3, GD: -3 } };
    assertEquals(
      updateGoalCount(
        { demoTeam1: { GF: 0, GA: 0, GD: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated goalCount when team scores 2 and concedes 4 so goal diff is -2", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 4],
      },
    };
    const expected = { demoTeam1: { GF: 2, GA: 4, GD: -2 } };
    assertEquals(
      updateGoalCount(
        { demoTeam1: { GF: 0, GA: 0, GD: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated goalCount when team scores 5 and concedes 2 so goal diff is 3", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [2, 1],
        ft: [5, 2],
      },
    };
    const expected = { demoTeam1: { GF: 5, GA: 2, GD: 3 } };
    assertEquals(
      updateGoalCount(
        { demoTeam1: { GF: 0, GA: 0, GD: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
});

describe("test updateScores", () => {
  it("return updated scores when demoTeam1 wins", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 0],
      },
    };
    const expected = { demoTeam1: { W: 1, D: 0, L: 0 } };
    assertEquals(
      updateScores(
        { demoTeam1: { W: 0, D: 0, L: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated scores when demoTeam2 wins", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [0, 3],
      },
    };
    const expected = { demoTeam2: { W: 1, D: 0, L: 0 } };
    assertEquals(
      updateScores(
        { demoTeam2: { W: 0, D: 0, L: 0 } },
        "demoTeam2",
        "away",
        "home",
        match
      ),
      expected
    );
  });
  it("return updated scores when its a draw for demoTeam1", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 2],
      },
    };
    const expected = { demoTeam1: { W: 0, D: 1, L: 0 } };
    assertEquals(
      updateScores(
        { demoTeam1: { W: 0, D: 0, L: 0 } },
        "demoTeam1",
        "home",
        "away",
        match
      ),
      expected
    );
  });
  it("return updated scores when its a draw for demoTeam2", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 2],
      },
    };
    const expected = { demoTeam2: { W: 0, D: 1, L: 0 } };
    assertEquals(
      updateScores(
        { demoTeam2: { W: 0, D: 0, L: 0 } },
        "demoTeam2",
        "away",
        "home",
        match
      ),
      expected
    );
  });
});

describe("test updateTeam", () => {
  it("return updated details for demoTeam1", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 0],
      },
    };
    const expected = {
      demoTeam1: {
        MP: 1,
        W: 1,
        D: 0,
        L: 0,
        GF: 2,
        GA: 0,
        GD: 2,
        Pts: 3,
      },
    };
    assertEquals(
      updateTeam(
        {},
        "demoTeam1",
        { teamSide: "home", oppoSide: "away" },
        match
      ),
      expected
    );
  });
  it("return updated details for demoTeam2", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 0],
      },
    };
    const expected = {
      demoTeam2: {
        MP: 1,
        W: 0,
        D: 0,
        L: 1,
        GF: 0,
        GA: 2,
        GD: -2,
        Pts: 0,
      },
    };
    assertEquals(
      updateTeam(
        {},
        "demoTeam2",
        { teamSide: "away", oppoSide: "home" },
        match
      ),
      expected
    );
  });
});

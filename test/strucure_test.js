import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { attainStats } from "../src/structureLib.js";

describe("test attainStats", () => {
  it("return updated details for both teams when team1 wins and team2 loses by 2 goals", () => {
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
    assertEquals(attainStats({}, match), expected);
  });

  it("return updated details for both teams when team1 loses and team2 wins by 5 goals", () => {
    const match = {
      round: "Matchday 1",
      date: "2023-08-11",
      time: "20:00",
      team1: "demoTeam1",
      team2: "demoTeam2",
      score: {
        ht: [0, 0],
        ft: [2, 7],
      },
    };
    const expected = {
      demoTeam1: {
        MP: 1,
        W: 0,
        D: 0,
        L: 1,
        GF: 2,
        GA: 7,
        GD: -5,
        Pts: 0,
      },
      demoTeam2: {
        MP: 1,
        W: 1,
        D: 0,
        L: 0,
        GF: 7,
        GA: 2,
        GD: 5,
        Pts: 3,
      },
    };
    assertEquals(attainStats({}, match), expected);
  });
  it("return updated details for both teams when its a draw and both teams have scored 2 goals", () => {
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
    const expected = {
      demoTeam1: {
        MP: 1,
        W: 0,
        D: 1,
        L: 0,
        GF: 2,
        GA: 2,
        GD: 0,
        Pts: 1,
      },
      demoTeam2: {
        MP: 1,
        W: 0,
        D: 1,
        L: 0,
        GF: 2,
        GA: 2,
        GD: 0,
        Pts: 1,
      },
    };
    assertEquals(attainStats({}, match), expected);
  });
});

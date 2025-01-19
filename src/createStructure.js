import data from "./match.json" with {type: "json"};
import {attainStats} from "./structureLib.js"

const main = () => {
  const matches = Object.values(data)[1];
  const matchData = matches.reduce(attainStats, {});
  const sortedData = Object.fromEntries(
    Object.entries(matchData).sort(
      ([, { Pts: Pts1 }], [, { Pts: Pts2 }]) => Pts2 - Pts1
    )
  );

  console.table(sortedData);
  return sortedData;
};

main();

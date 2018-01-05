const { input } = require('./input');

const components = input
  .split('\n')
  .map(comp => [parseInt(comp.split('/')[0]), parseInt(comp.split('/')[1])]);

const sum = arr => arr.reduce((a, b) => a + b, 0);

const findMatches = (toMatch, pieces) =>
  pieces.filter(comp => comp.includes(toMatch));

const longestBridges = [{ length: 67, strength: 0 }];

const buildBridge = (bridge, remaining) => {
  const matched = findMatches(bridge[bridge.length - 1], remaining);

  if (matched.length === 0) {
    if (longestBridges[0].length <= bridge.length) {
      longestBridges.push({
        length: bridge.length,
        strength: sum(bridge)
      });
    }
    return; // end of tree
  }
  matched.forEach(match => {
    const localBridge = [...bridge];
    const localRemaining = [...remaining];
    const rIdx = remaining.findIndex(
      pair => pair[0] === match[0] && pair[1] === match[1]
    );
    localRemaining.splice(rIdx, 1);
    match =
      match.indexOf(localBridge[localBridge.length - 1]) === 1
        ? match.reverse()
        : match;
    localBridge.push(...match);
    return buildBridge(localBridge, localRemaining);
  });
};

buildBridge([0], components);

const maxlength = Math.max(...longestBridges.map(bridge => bridge.length));
const result = longestBridges
  .filter(bridge => bridge.length === maxlength)
  .map(bridge => bridge.strength)
  .sort();

console.log(result[result.length - 1]);

const { input } = require('./input');

const components = input
  .split('\n')
  .map(comp => [parseInt(comp.split('/')[0]), parseInt(comp.split('/')[1])]);

const sum = arr => arr.reduce((a, b) => a + b, 0);

const findMatches = (toMatch, pieces) =>
  pieces.filter(comp => comp.includes(toMatch));

let maxSum = 0;

const buildBridge = (bridge, remaining) => {
  const matched = findMatches(bridge[bridge.length - 1], remaining);

  if (matched.length === 0) {
    if (maxSum < sum(bridge)) maxSum = sum(bridge);
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

console.log(maxSum);

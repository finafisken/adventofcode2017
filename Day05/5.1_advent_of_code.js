const { input } = require('./input');
const moves = input.split('\n').map(x => parseInt(x));

const steps = [];
let idx = 0;

while(idx <= (moves.length - 1)){
  const nextStep = moves[idx];
  steps.push(nextStep);
  moves[idx]++;
  idx += nextStep;
}

console.log(steps.length);

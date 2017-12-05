const { input } = require('./input');
const moves = input.split('\n').map(x => parseInt(x));

const steps = [];
let idx = 0;

while(idx < moves.length){
  const nextStep = moves[idx];
  steps.push(nextStep);
  if (nextStep >= 3) {
    moves[idx]--;
  } else {
    moves[idx]++;
  }
  idx += nextStep;
}

console.log(steps.length);


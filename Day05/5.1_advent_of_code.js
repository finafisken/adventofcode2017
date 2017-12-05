const { input } = require('./input');
const steps = input.split('\n');

console.log(steps);

const turns = 0;
const moveSteps = (idx, steps, array) => {
  // returns new position
  if (idx + steps < 0) {
    throw 'Something went wrong, index less than 0';
  } else if((idx + steps) > (array.length - 1)) {
    // reached end
    return 'DONE';
  }
  return idx + steps;
}

const turn = (idx, array) =>{
  const step = array[idx];
  array[idx]++;
  const nextIdx = moveSteps(idx, step, array);
  if (nextIdx === 'DONE') {
    return;
  }
  turns++;
  turn(nextIdx, array);
}

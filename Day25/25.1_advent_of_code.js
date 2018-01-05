const steps = 12368930;

const states = {
  a: [
    { write: 1, move: 1, nextState: 'b' },
    { write: 0, move: 1, nextState: 'c' }
  ],
  b: [
    { write: 0, move: -1, nextState: 'a' },
    { write: 0, move: 1, nextState: 'd' }
  ],
  c: [
    { write: 1, move: 1, nextState: 'd' },
    { write: 1, move: 1, nextState: 'a' }
  ],
  d: [
    { write: 1, move: -1, nextState: 'e' },
    { write: 0, move: -1, nextState: 'd' }
  ],
  e: [
    { write: 1, move: 1, nextState: 'f' },
    { write: 1, move: -1, nextState: 'b' }
  ],
  f: [
    { write: 1, move: 1, nextState: 'a' },
    { write: 1, move: 1, nextState: 'e' }
  ]
};

const tape = Array(100).fill(0);
const sum = arr => arr.reduce((a, b) => a + b, 0);

const extendTape = dir => {
  if(dir === 1) {
    tape.push(0);
  } else {
    tape.unshift(0);
  }
};

const getNext = (pos, currentState) => states[currentState][tape[pos]];


let cursorPos = tape.length/2;
let currentState = 'a';
let i = 0;

while (i < steps){
  const { write, move, nextState } = getNext(cursorPos, currentState);
  tape[cursorPos] = write;
  // check here if out of bounds
  if (cursorPos + move < 0 || cursorPos + move > tape.length - 1) {
    extendTape(move);
    if(cursorPos + move < 0) {
      cursorPos = 0;
    } else {
      cursorPos += move;
    }
  } else {
    cursorPos += move; 
  }
  currentState = nextState;
  i++;
}

console.log(sum(tape));

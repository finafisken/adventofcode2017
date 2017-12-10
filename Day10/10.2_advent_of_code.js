const { input } = require('./input');
const lengths = input
  .split('')
  .map(x => x.charCodeAt(0))
  .concat([17,31,73,47,23]);

let list = Array(256).fill(0).map((v, i) => i);

const fillIndex = (start, fill) => {
  let index = start;
  while(fill.length > 0) {
    const toInsert = fill.shift();
    index = index % list.length;
    list[index] = toInsert;
    index++;
  }
}

const doNext = (listIdx, lengths, skip) => {
  if (lengths.length === 0) {
    globalIndex = listIdx;
    globalSkip = skip; 
    return;
  }
  const instruction = lengths[0];
  let reversed = [];
  let i = 0;
  while (i < instruction) {
    reversed.push(list[(listIdx + i)%list.length]);
    i++;
  }
  reversed.reverse();
  fillIndex(listIdx, reversed);
  const newIdx = (listIdx + instruction + skip) % list.length;
  skip++
  return doNext(newIdx, lengths.slice(1), skip);
};

// get sparse hash
let globalIndex = 0;
let globalSkip = 0;
for (let round = 1; round <= 64; round++) {
  doNext(globalIndex, lengths, globalSkip);
}

// get dense hash
const temp = [...list]
const partial16 = [];
for (let round = 1; round <= 16; round++) {
  partial16.push(temp.splice(0,16));
}

// perform bitwise XOR and parse to hexadecimal for each chunk
// make sure at least two ints (took way to long to discover...)
const chunks = partial16
  .map(chunk => eval(chunk.join(' ^ ')))
  .map(chunk => chunk.toString(16).padStart(2, '0'));

console.log(JSON.stringify(chunks, null, 2));
console.log('hash:', chunks.join(''));
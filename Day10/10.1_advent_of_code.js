const { input } = require('./input');
const lengths = input.split(',').map(x => parseInt(x));

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
    return list[0]*list[1];
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
  // for each turn new index will be cIdx + inst + skip
  // we remove the first length instruction since its processed
  // skip is incremented
  const newIdx = (listIdx + instruction + skip) % list.length;
  skip++
  return doNext(newIdx, lengths.slice(1), skip);
};

const result = doNext(0, lengths, 0);

console.log(JSON.stringify(list, null, 2));
console.log('length:', list.length);
console.log(result);
const { input } = require('./input');
let memBanks = input.split('\t').map(x => parseInt(x));

const previous = [];

const getMaxData = array => {
  const max = Math.max(...array);
  return {
    max, 
    idx: array.indexOf(max),
  };
};

const arraysAreEqual = (arr1, arr2) => arr1.every((val, i) => val === arr2[i]);

 do {
  previous.push([...memBanks]);
  const maxData = getMaxData(memBanks);
  let redistAmount = maxData.max
  const diffArr = Array(memBanks.length).fill(0);
  for (let i = (maxData.idx+1) % memBanks.length; redistAmount > 0; redistAmount--){
    diffArr[i]++;
    i = (i + 1) % memBanks.length;
  }
  memBanks[maxData.idx] = 0;
  memBanks = memBanks.map((val, i) => val + diffArr[i]);
  
} while (!previous.some(prevRes => arraysAreEqual(prevRes, memBanks)))

console.log('cycles: ', previous.length);

// find max
// divide by membanks.length (as well as we can)
// redistribute by going i +1, loop on end
// push configuration to previous when done


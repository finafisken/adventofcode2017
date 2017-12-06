const { input } = require('./input');
const memBanks = input.split('\t').map(x => parseInt(x));
console.log(memBanks);
console.log(memBanks.length);

const previous = [
  [...memBanks]
];

// find max
// divide by membanks.length (as well as we can)
// redistribute by going i +1, loop on end
// push configuration to previous when done


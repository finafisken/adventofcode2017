const { input } = require('./input');

const getPipe = data => parseInt(data.split(' ')[0]);
const getConnections = data => data.split(' <-> ')[1].split(', ').map(x => parseInt(x));

const pipes = input.split('\n').map(row => ({
  id: getPipe(row),
  connections: getConnections(row),
}));

// followConnections = pipe => {

// }

console.log(pipes);
const { input } = require('./input');

const getPipe = data => parseInt(data.split(' ')[0]);
const getConnections = data => data.split(' <-> ')[1].split(', ').map(x => parseInt(x));

const pipes = input.split('\n').map(row => ({
  id: getPipe(row),
  connections: getConnections(row),
}));

let remainingPipes = [...pipes];
const visited = [];

followConnections = pipe => {
  pipe.connections.forEach(conn => {
    if (!visited.includes(conn)) {
      visited.push(conn);
      followConnections(pipes.find(pipe => pipe.id === conn));
    }
  });
}

let groups = 0;

while (remainingPipes.length > 0) {
  followConnections(remainingPipes[0]);
  remainingPipes = remainingPipes.filter(pipe => !visited.includes(pipe.id));
  groups++;
}

console.log(groups);
const { input } = require('./input');

const getPipe = data => parseInt(data.split(' ')[0]);
const getConnections = data => data.split(' <-> ')[1].split(', ').map(x => parseInt(x));

const pipes = input.split('\n').map(row => ({
  id: getPipe(row),
  connections: getConnections(row),
}));

const visited = [0];

followConnections = pipe => {
  pipe.connections.forEach(conn => {
    if (!visited.includes(conn)) {
      visited.push(conn);
      followConnections(pipes.find(pipe => pipe.id === conn));
    }
  });
}

followConnections(pipes[0]);

console.log(visited.length);
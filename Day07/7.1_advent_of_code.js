// const { input } = require('./input');
const input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;
const inputArray = input.split('\n');

const hasChildren = node => node.indexOf(' -> ') !== -1;
const getChildren = node => node.substring(node.indexOf(' -> ') + 4).split(', ');
const getName = node => node.substring(0, node.indexOf(' '));

const nodes = inputArray.map(node => ({
  name: getName(node),
  children: hasChildren(node) ? getChildren(node) : [],
}));

const nodesWithChildren = nodes.filter(node => node.children.length > 0);
// const findParents = (node, otherNodes) => otherNodes.find(other => other.children.includes(node.name));
const findParents = (node, otherNodes) => {
  const lul = other => {
    console.log(other.children.includes(node.name))
    return other.children.includes(node.name);
  }
  console.log(otherNodes.find(lul));
  return otherNodes.find(lul);
}
// ^ WORKS CORRECTLY

const findRootNode = remainingNodes => {
  console.log(remainingNodes);
  if(remainingNodes.length === 1){
    return remainingNodes[0].name;
  }
  const parents = remainingNodes.filter(node => findParents(node, remainingNodes))
  findRootNode(parents);
};


const rootNode = findRootNode(nodesWithChildren);
console.log(rootNode);


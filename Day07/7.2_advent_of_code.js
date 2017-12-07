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
const getWeight = node => parseInt(node.substring(node.indexOf('(') + 1, node.indexOf(')')));
const findParent = (node, otherNodes) => otherNodes.find(other => other.children.includes(node.name));

let nodes = inputArray.map(node => ({
  name: getName(node),
  weight: getWeight(node),
  children: hasChildren(node) ? getChildren(node) : [],
}));

const getTotalNodeWeight = ({ children, weight, name }, nodesWithTotalWeight) => {
  if (children.length === 0) return weight;
  return children
    .map(childName => nodesWithTotalWeight.find(node => node.name === childName))
    .map(x => x.totalWeight)
    .reduce((a, b) => a + b) + weight;
};

const nodesWithoutChildren = nodes.filter(node => node.children.length === 0)
  .map(node => ({ ...node, totalWeight: getTotalNodeWeight(node, nodes)}));
const nodesWithChildren = nodes.filter(node => node.children.length > 0);


nodes = [...nodesWithoutChildren, ...nodesWithChildren];
let nodesWithTotalWeight = [...nodesWithoutChildren];

while (nodesWithTotalWeight.length !== nodes.length) {
  nodesWithTotalWeight = nodes.filter(node => node.totalWeight);
  nodesWithTotalWeight.forEach(node => {
    const parent = findParent(node, nodes);
    if (parent) {
      node.parent = parent.name;
      nodes.find(node => node === parent).totalWeight = getTotalNodeWeight(parent, nodesWithTotalWeight);
    }
  });
};

isImbalanced = (nodes, node) => {
  if(node.children.length > 0) {
    const childrenWithData = nodes.filter(n => n.parent === node.name);
    return childrenWithData.some(node => node.totalWeight !== childrenWithData[0].totalWeight);
  }
  return false;
}

const imbalancedNode = nodes.find((node, i, self) => isImbalanced(self, node));
const imbalancedNodeChildren = nodes.filter(n => n.parent === imbalancedNode.name);
const childTotalWeights = imbalancedNodeChildren.map(child => child.totalWeight);
const weightMax = Math.max(...childTotalWeights);
const weightMin = Math.min(...childTotalWeights);
const weightDelta = weightMax - weightMin;

const anomalyWeight = imbalancedNodeChildren.filter(x => x.totalWeight === weightMax).length > 1 ? weightMin : weightMax;
const weight = imbalancedNodeChildren.find(node => node.totalWeight === anomalyWeight).weight;
console.log(JSON.stringify(imbalancedNode, null, 2));
console.log(weight - weightDelta);











const findRootNode = remainingNodes => {
  if(remainingNodes.length <= 1) {
    return remainingNodes[0];
  }
  const parents = remainingNodes.filter(node => !findParent(node, remainingNodes));
  
  return findRootNode(parents);
};



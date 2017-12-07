const { input } = require('./input');
const inputArray = input.split('\n');

const hasChildren = node => node.indexOf(' -> ') !== -1;
const getChildren = node => node.substring(node.indexOf(' -> ') + 4).split(', ');
const getName = node => node.substring(0, node.indexOf(' '));

const nodes = inputArray.map(node => ({
  name: getName(node),
  children: hasChildren(node) ? getChildren(node) : [],
}));

const nodesWithChildren = nodes.filter(node => node.children.length > 0);
const findParent = (node, otherNodes) => otherNodes.find(other => other.children.includes(node.name));

// The node without a parent is the root node
const rootNode = nodesWithChildren.filter(node => !findParent(node, nodesWithChildren))[0];
console.log(rootNode.name);


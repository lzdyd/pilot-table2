export default class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(key, value, label, state, formula) {
    this.nodes.push({
      key,
      value,
      label,
      state,
      formula,
      dependence: []
    });
  }

  find(key) {
    return this.nodes.find((node) => {
      return node.key === key;
    });
  }

  addLine(startValue, endValue) {
    const startNode = this.find(startValue);
    const endNode = this.find(endValue);

    if (!startNode || !endNode) {
      throw new Error('Обе вершины должны существовать');
    }

    startNode.dependence.push(endNode);
  }
}

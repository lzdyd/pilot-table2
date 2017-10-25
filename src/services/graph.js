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
        return this.nodes.find(function(node) {
            return node.key === key;
        });
    }

    addLine(startValue, endValue) {
        let startNode = this.find(startValue);
        let endNode = this.find(endValue);

        if (!startNode || !endNode) {
            throw new Error('Обе вершины должны существовать');
        }

        startNode.dependence.push(endNode);
    }
}
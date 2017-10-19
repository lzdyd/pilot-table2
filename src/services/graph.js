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
        // Найдём вершины для каждого из значений.
        var startNode = this.find(startValue);
        var endNode = this.find(endValue);

        // Ругнёмся, если не нашли одной или другой.
        if (!startNode || !endNode) {
            throw new Error('Обе вершины должны существовать');
        }

        // В стартовую вершину startNode добавим ссылку на конечную вершину endNode.
        startNode.dependence.push(endNode);
    }
}
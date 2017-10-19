
export function calculate(str) {
    var exprArr = parseExp(str),
        startNode = new Node(exprArr);
    createTree(startNode);
    return calcTree(startNode);
}


//------------------------------------------

function Node (nodeValue) {
    nodeValue = nodeValue || '';

    var children = [];

    return {
        value : function (value) {
            if (arguments.length) {
                nodeValue = value;
                return this;
            } else {
                return nodeValue;
            }
        },

        child : function (id) {
            return children[id];
        },

        addChild : function (node) {
            children.push(node);
            return this;
        }
    };
}

//-----------------------------------

function parseExp(exp) {
    return exp.replace(/\s/g, '')
        .replace(/([+-\/*]|^|\()-([\d.]+)/g, '$1(0-$2)') // -1 -> (0-1)
        .match(/[\d.]+|[+-\/*\(\)]/g);
}

function isOperator(char) {
    return  char === '+' ||
        char === '-' ||
        char === '*' ||
        char === '/';
}

function getClosingBracket(expr, pos) {
    var counter = 0;
    for (len = expr.length; pos < len; pos++) {
        var char = expr[pos];

        if (char === '(') {
            counter++;
        } else if (char === ')') {
            if (!--counter) return pos;
        }
    }

    return 0;
}

function getLowPriorityOp(expArr) {
    var len = expArr.length,
        i, val,
        lowOp = '',
        lowPos = 0;

    for (i = 0; i < len; i++) {
        val = expArr[i];

        if (val === '(') {
            i = getClosingBracket(expArr, i);
            continue;
        }

        if (isOperator(val)) {
            if (!lowOp ||
                (lowOp === '*' || lowOp === '/' &&
                    val === '+' || val === '-')) {

                lowOp = val;
                lowPos = i;
            }
        }
    }

    return lowPos;
}

//---------------------------------------

function trimBrackets(exprArr) {
    while (true) {
        if (exprArr[0] === '(' &&
            getClosingBracket(exprArr, 0) === exprArr.length -1 ) {

            exprArr = exprArr.slice(1, exprArr.length -1);
        } else {
            return exprArr;
        }
    }
}

//---------------------------------------

function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function isExpression(expArr) {
    return isArray(expArr) && expArr.join('').search(/[+\-\/*]/) !== -1;
}

//---------------------------------------
//
function createTree(node) {
    var expArr = trimBrackets(node.value()),
        divPos = 0,
        opChar = '',
        nodeA, nodeB;

    if (!isExpression(expArr)) return;

    divPos = getLowPriorityOp(expArr);
    opChar = expArr[divPos];

    nodeA = new Node(expArr.slice(0, divPos));
    nodeB = new Node(expArr.slice(divPos + 1));

    node.addChild(nodeA).addChild(nodeB);
    node.value(opChar);

    createTree(nodeA);
    createTree(nodeB);
}

//---------------------------------------

function calcTree(rootNode) {
    var val = rootNode.value();

    if (isString(val) && val.search(/[+\-\/*]/) !== -1) {
        var childA = rootNode.child(0),
            childB = rootNode.child(1),
            valA = calcTree(childA),
            valB = calcTree(childB);

        switch(val) {
            case '+' : return valA + valB;
            case '-' : return valA - valB;
            case '*' : return valA * valB;
            case '/' : return valA / valB;
        }
    } else {
        return Number(val);
    }
}
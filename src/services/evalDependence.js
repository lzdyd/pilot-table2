export function evaluatesDependence(data) {
    let formula;
    let copyFormula;

    for (let key in data) {
        formula = data.formula.split(" ");
        copyFormula = formula.slice();
        formula.forEach((elem) => {
            if (data.dependence) {
                data.dependence.forEach((node) => {
                    if (elem === node.key) {
                        copyFormula.splice(formula.indexOf(elem), 1, +node.value);
                    }
                });
            }
        })
    }

    return  eval( '('+ copyFormula.join("") +')' );
}
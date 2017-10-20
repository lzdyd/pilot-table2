import { calculate } from './api/calc';

export function evaluatesDependence(data) {
    let formula;
    let copyFormula;
    let strFormula;


    for (let key in data) {
        formula = data.formula.split(" ");
        copyFormula = formula.slice();
        formula.forEach((elem) => {
            if (data.dependence) {
                data.dependence.forEach((item) => {
                    if (!item.value) {
                        item.value = evaluatesDependence(item);
                    }
                });

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
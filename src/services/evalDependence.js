
export function evaluatesDependence(data) {
    let formula;
    let copyFormula;

    formula = data.formula.split(" ");
    copyFormula = formula.slice();

    formula.forEach((elem) => {
        if (data.dependence.length > 0) {
            data.dependence.forEach((item) => {
                if (!item.value) {
                    item.value = evaluatesDependence(item);
                }
                if (elem === item.key) {
                    copyFormula.splice(formula.indexOf(elem), 1, +item.value);
                }
            });
        }
    });

    return  eval( '('+ copyFormula.join("") +')' );
}